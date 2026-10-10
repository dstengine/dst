#!/usr/bin/env node
// Google Analytics 4 (GA4) data export CLI for the DST network.
//
// Usage:
//   node scripts/ga.mjs properties                 # list accessible GA4 properties
//   node scripts/ga.mjs summary [days]             # total users, sessions, pageviews, events
//   node scripts/ga.mjs pages [days] [limit]       # top pages by pageviews
//   node scripts/ga.mjs events [days] [limit]      # top events and counts
//   node scripts/ga.mjs traffic [days] [limit]     # traffic by source / medium
//   node scripts/ga.mjs realtime                   # active users in last 30 minutes
//   node scripts/ga.mjs set-key <path/to/key.json> # save service account key
//
// Authentication:
//   Reads credentials in order:
//     1. GA_SERVICE_ACCOUNT in env (raw JSON or base64)
//     2. GA_KEY_FILE in env
//     3. ~/.config/dst/ga-service-account.json
//     4. /Users/vvm/dst/.secrets/ga4-reader.json
//
// Signed using node:crypto (RSA-SHA256 JWT, RFC 7523) without large third-party client dependencies.

import { createSign } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const ADMIN_API = "https://analyticsadmin.googleapis.com/v1beta";

// Load .env if present
const root = new URL("..", import.meta.url).pathname;
const envFile = join(root, ".env");
if (existsSync(envFile) && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(envFile);
  } catch {}
}

export function serviceAccount() {
  const envVal = process.env.GA_SERVICE_ACCOUNT || process.env.GSC_SERVICE_ACCOUNT;
  if (envVal) {
    const raw = envVal.trim().startsWith("{")
      ? envVal.trim()
      : Buffer.from(envVal.trim(), "base64").toString("utf8");
    return JSON.parse(raw);
  }

  const candidatePaths = [
    process.env.GA_KEY_FILE,
    join(homedir(), ".config/dst/ga-service-account.json"),
    "/Users/vvm/dst/.secrets/ga4-reader.json",
  ].filter(Boolean);

  for (const p of candidatePaths) {
    if (existsSync(p)) {
      return JSON.parse(readFileSync(p, "utf8"));
    }
  }

  return null;
}

const b64url = (data) => Buffer.from(data).toString("base64url");

export function assertion(sa, now = Math.floor(Date.now() / 1000)) {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signature = createSign("RSA-SHA256")
    .update(`${head}.${claims}`)
    .sign(sa.private_key);
  return `${head}.${claims}.${b64url(signature)}`;
}

let cachedToken = null;

export async function getAccessToken(sa = serviceAccount()) {
  if (!sa) {
    throw new Error(
      "No Google Analytics service account key found. Use 'node scripts/ga.mjs set-key <key.json>' or set GA_SERVICE_ACCOUNT in .env."
    );
  }
  if (cachedToken && cachedToken.until > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: assertion(sa),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `GA token exchange failed, HTTP ${res.status}: ${err.error_description || err.error || "unknown"}`
    );
  }

  const body = await res.json();
  cachedToken = {
    value: body.access_token,
    until: Date.now() + body.expires_in * 1000,
  };
  return cachedToken.value;
}

export async function gaFetch(endpoint, method = "GET", body = null) {
  const token = await getAccessToken();
  const res = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `GA API error (${res.status}): ${err.error?.message || err.message || JSON.stringify(err)}`
    );
  }

  return res.json();
}

/**
 * List all GA4 properties accessible to this service account.
 */
export async function getProperties() {
  const data = await gaFetch(`${ADMIN_API}/accountSummaries`);
  const list = [];
  for (const acc of data.accountSummaries || []) {
    for (const prop of acc.propertySummaries || []) {
      list.push({
        account: acc.displayName,
        accountId: acc.account?.replace("accounts/", ""),
        property: prop.displayName,
        propertyId: prop.property?.replace("properties/", ""),
      });
    }
  }
  return list;
}

/**
 * Resolves target property ID: environment, argument, or first available from accountSummaries.
 */
export async function resolvePropertyId(explicitId) {
  if (explicitId) return explicitId.replace(/^properties\//, "");
  if (process.env.GA_PROPERTY_ID) {
    return process.env.GA_PROPERTY_ID.replace(/^properties\//, "");
  }
  const props = await getProperties();
  if (props.length === 0) {
    throw new Error(
      "No GA4 properties accessible to this service account. Grant Viewer permissions to the service account in GA4 Admin."
    );
  }
  return props[0].propertyId;
}

/**
 * Runs a GA4 report.
 */
export async function runReport(propertyId, payload) {
  return gaFetch(`${DATA_API}/properties/${propertyId}:runReport`, "POST", payload);
}

/**
 * Runs a GA4 realtime report.
 */
export async function runRealtimeReport(propertyId, payload) {
  return gaFetch(`${DATA_API}/properties/${propertyId}:runRealtimeReport`, "POST", payload);
}

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith("ga.mjs")) {
  const args = process.argv.slice(2);
  const cmd = args[0] || "summary";

  const print = (data) => console.log(JSON.stringify(data, null, 2));

  try {
    if (cmd === "set-key") {
      const keyPath = args[1];
      if (!keyPath || !existsSync(keyPath)) {
        console.error("Usage: node scripts/ga.mjs set-key <path/to/key.json>");
        process.exit(1);
      }
      const raw = readFileSync(keyPath, "utf8");
      const sa = JSON.parse(raw);
      if (!sa.client_email || !sa.private_key) {
        throw new Error("Invalid service account JSON: client_email or private_key missing.");
      }
      const dir = join(homedir(), ".config/dst");
      mkdirSync(dir, { recursive: true });
      const target = join(dir, "ga-service-account.json");
      writeFileSync(target, raw, { mode: 0o600 });
      console.log(`✓ Saved GA service account key (${sa.client_email}) to ${target}`);
    } else if (cmd === "properties" || cmd === "sites") {
      const list = await getProperties();
      print(list);
    } else if (cmd === "summary") {
      const days = Number(args[1] || 28);
      const propertyId = await resolvePropertyId(args[2]);
      const report = await runReport(propertyId, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "eventCount" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
        ],
      });
      const values = report.rows?.[0]?.metricValues || [];
      const headers = report.metricHeaders || [];
      const metrics = {};
      headers.forEach((h, i) => {
        metrics[h.name] = Number(values[i]?.value || 0);
      });
      print({ propertyId, days, metrics });
    } else if (cmd === "pages") {
      const days = Number(args[1] || 28);
      const limit = Number(args[2] || 20);
      const propertyId = await resolvePropertyId(args[3]);
      const report = await runReport(propertyId, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "activeUsers" },
          { name: "bounceRate" },
        ],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit,
      });
      const rows = (report.rows || []).map((r) => ({
        pagePath: r.dimensionValues[0]?.value,
        views: Number(r.metricValues[0]?.value || 0),
        activeUsers: Number(r.metricValues[1]?.value || 0),
        bounceRate: Number(r.metricValues[2]?.value || 0),
      }));
      print({ propertyId, days, count: rows.length, pages: rows });
    } else if (cmd === "events") {
      const days = Number(args[1] || 28);
      const limit = Number(args[2] || 20);
      const propertyId = await resolvePropertyId(args[3]);
      const report = await runReport(propertyId, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit,
      });
      const rows = (report.rows || []).map((r) => ({
        eventName: r.dimensionValues[0]?.value,
        eventCount: Number(r.metricValues[0]?.value || 0),
        totalUsers: Number(r.metricValues[1]?.value || 0),
      }));
      print({ propertyId, days, count: rows.length, events: rows });
    } else if (cmd === "traffic") {
      const days = Number(args[1] || 28);
      const limit = Number(args[2] || 10);
      const propertyId = await resolvePropertyId(args[3]);
      const report = await runReport(propertyId, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit,
      });
      const rows = (report.rows || []).map((r) => ({
        sourceMedium: r.dimensionValues[0]?.value,
        sessions: Number(r.metricValues[0]?.value || 0),
        activeUsers: Number(r.metricValues[1]?.value || 0),
      }));
      print({ propertyId, days, traffic: rows });
    } else if (cmd === "realtime") {
      const propertyId = await resolvePropertyId(args[1]);
      const report = await runRealtimeReport(propertyId, {
        metrics: [{ name: "activeUsers" }],
      });
      const active = Number(report.rows?.[0]?.metricValues?.[0]?.value || 0);
      print({ propertyId, activeUsersLast30Min: active });
    } else {
      console.log(`Usage:
  node scripts/ga.mjs properties                 # list accessible GA4 properties
  node scripts/ga.mjs summary [days]             # total users, sessions, pageviews
  node scripts/ga.mjs pages [days] [limit]       # top pages by views
  node scripts/ga.mjs events [days] [limit]      # top events and user counts
  node scripts/ga.mjs traffic [days] [limit]     # traffic sources
  node scripts/ga.mjs realtime                   # active users in last 30m
  node scripts/ga.mjs set-key <path/to/key.json> # save service account credentials`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
