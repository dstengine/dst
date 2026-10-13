#!/usr/bin/env python3
"""The GA4 digest, posted to Telegram — 24 hours, a week or a month.

    python3 tools/ga-report.py             the period today's date calls for
    python3 tools/ga-report.py --period day|week|month
    python3 tools/ga-report.py --dry-run   print, send nothing

The period picks itself, because the cron entry is one line and the rule
belongs where it can be read:

    first Friday of the month  -> the month
    any other Friday           -> the week
    every other day            -> the last 24 hours

A monthly Friday does not also get a weekly one. The month contains the
week, and two digests twenty seconds apart is how a report stops being read.

Deliberately not a copy of tools/ga.py. That one is for reading at a
terminal, where a wide table is fine; this is read on a phone, where it is
not, so the shape is different: a handful of totals, the hosts that moved,
and the events that decide whether the period was any good.

Two numbers lead rather than sessions. Most of what this property records
is automated traffic — direct, one page, no scroll, gone — and a sessions
figure that counts it says the week was busy when it was not. Engaged
sessions is the honest headline; sessions is kept beside it so the gap
stays visible instead of being quietly averaged away.

The daily report is the reason this file has two ways of asking GA the same
question. A day report sent at 16:20 cannot compare a part-day against a
whole one — the delta would be negative every afternoon and mean nothing —
so the day period is read by `dateHour` and bucketed into the trailing 24
hours against the 24 before them, which is the comparison the number
claims to be. Week and month have whole days to work with and use ordinary
date ranges. Everything downstream sees the same {current, previous} shape.

The week and the month also carry Search Console: clicks, impressions and
queries, and before them any host that is missing from Search Console or
whose sitemap Google has not read — the failure no GA number shows.

Credentials: GA4_KEY or ~/dst/.secrets/ga4-reader.json for the read,
REPORTS_TELEGRAM_API_KEY / REPORTS_TELEGRAM_CHAT_ID from ~/dst/.env for the
send. Nothing is printed that would put a secret in a log.
"""
import os, re, sys, json, urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from html import escape
from urllib.parse import quote, urlparse

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression)

PROPERTY = "properties/548390990"
os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS",
                      os.environ.get("GA4_KEY", os.path.expanduser("~/dst/.secrets/ga4-reader.json")))


# --- which period ------------------------------------------------------
def period_for(now):
    if "--period" in sys.argv:
        return sys.argv[sys.argv.index("--period") + 1]
    if now.weekday() != 4:              # Monday is 0, so Friday is 4
        return "day"
    return "month" if now.day <= 7 else "week"


NOW = datetime.now()
PERIOD = period_for(NOW)
if PERIOD not in ("day", "week", "month"):
    raise SystemExit(f"no period called {PERIOD!r}")

TITLE = {"day": "last 24 hours", "week": "week to date", "month": "last 30 days"}[PERIOD]
AGAINST = {"day": "the 24 hours before",
           "week": "the week before",
           "month": "the 30 days before"}[PERIOD]
RANGES = {
    "week": (DateRange(start_date="7daysAgo", end_date="today"),
             DateRange(start_date="14daysAgo", end_date="8daysAgo")),
    "month": (DateRange(start_date="30daysAgo", end_date="today"),
              DateRange(start_date="60daysAgo", end_date="31daysAgo")),
}.get(PERIOD)

client = BetaAnalyticsDataClient()


def _run(dims, mets, limit, ranges, event=None):
    kw = {}
    if event:
        kw["dimension_filter"] = FilterExpression(filter=Filter(
            field_name="eventName", string_filter=Filter.StringFilter(value=event)))
    r = client.run_report(RunReportRequest(
        property=PROPERTY, date_ranges=list(ranges),
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets], limit=limit, **kw))
    return [([v.value for v in row.dimension_values], [float(v.value) for v in row.metric_values])
            for row in r.rows]


# The two 24-hour windows, as GA writes them in `dateHour` (YYYYMMDDHH, in
# the property's timezone). The current hour is still filling, so both
# windows end on the same partial hour and the comparison stays fair.
def _hour_windows():
    top = NOW.replace(minute=0, second=0, microsecond=0)
    cur = {(top - timedelta(hours=h)).strftime("%Y%m%d%H") for h in range(24)}
    prev = {(top - timedelta(hours=h)).strftime("%Y%m%d%H") for h in range(24, 48)}
    return cur, prev


CUR_HOURS, PREV_HOURS = _hour_windows() if PERIOD == "day" else (None, None)


def series(dims, mets, limit=100, event=None):
    """{current: {dim-tuple: metrics}, previous: {...}} for this period.

    Metrics are summed, so pass only additive ones — sessions, counts,
    views. An average (session duration) must not come through here; it
    would be added up hour by hour into a meaningless number.
    """
    cur, prev = defaultdict(lambda: [0.0] * len(mets)), defaultdict(lambda: [0.0] * len(mets))
    if PERIOD == "day":
        # A day of hours is 24 rows per dimension value, so the cap has to
        # be generous or a host would drop out halfway through the night.
        rows = _run(["dateHour"] + dims, mets, max(limit * 60, 2000), (
            DateRange(start_date="3daysAgo", end_date="today"),), event)
        for d, m in rows:
            bucket = cur if d[0] in CUR_HOURS else prev if d[0] in PREV_HOURS else None
            if bucket is None:
                continue
            key = tuple(d[1:])
            for i, v in enumerate(m):
                bucket[key][i] += v
    else:
        rows = _run(dims, mets, limit, RANGES, event)
        for d, m in rows:
            # With two ranges GA appends a dateRange dimension to every row.
            bucket = cur if d[-1] == "date_range_0" else prev
            key = tuple(d[:-1])
            for i, v in enumerate(m):
                bucket[key][i] += v
    return dict(cur), dict(prev)


def delta(now, before):
    """Period on period, as a sign and a percentage — or '—' when the last
    one was zero, because a change from nothing is a division, not news."""
    if not before:
        return "new" if now else "—"
    return f"{(now - before) / before * 100:+.0f}%"


# --- the totals --------------------------------------------------------
# totalUsers is left out of the day report on purpose: it is a count of
# distinct people, and summing it hour by hour counts the same visitor
# once an hour. Week and month read it from a single range, where it means
# what it says.
MET = ["sessions", "engagedSessions", "screenPageViews"] + ([] if PERIOD == "day" else ["totalUsers"])
LABELS = ["sessions", "engaged", "views"] + ([] if PERIOD == "day" else ["users"])

cur_tot, prev_tot = series([], MET)
cur = cur_tot.get((), [0.0] * len(MET))
prv = prev_tot.get((), [0.0] * len(MET))

lines = [f"<b>DST network · {TITLE}</b>", f"<i>vs {AGAINST}</i>", ""]
for i, label in enumerate(LABELS):
    lines.append(f"{label:<10}{int(cur[i]):>6}   {delta(cur[i], prv[i])}")
share = cur[1] / cur[0] * 100 if cur[0] else 0
lines.append(f"{'engaged %':<10}{share:>5.0f}%")

# --- hosts, ranked by engaged sessions --------------------------------
host_cur, _ = series(["hostName"], ["sessions", "engagedSessions"])
rows = [(k[0], m[1], m[0]) for k, m in host_cur.items()]
rows = [r for r in rows if not r[0].startswith(("localhost", "127."))]
rows.sort(key=lambda r: (-r[1], -r[2]))
if rows:
    lines += ["", "<b>Hosts</b> (engaged / sessions)", "<pre>"]
    for host, eng, sess in rows[:12]:
        lines.append(f"{host:<22}{int(eng):>4} /{int(sess):>5}")
    lines.append("</pre>")

# --- the events that decide whether the period was any good -----------
WATCH = ["ticket_click", "generate_lead", "lead_failed", "form_start", "cta_click", "outbound_click"]
ev_cur, _ = series(["eventName"], ["eventCount"], limit=200)
seen = {k[0]: int(m[0]) for k, m in ev_cur.items()}
lines += ["<b>Events</b>", "<pre>"]
for name in WATCH:
    lines.append(f"{name:<16}{seen.get(name, 0):>5}")
lines.append("</pre>")

# --- ticket clicks, and the pages they came from ----------------------
# The one act this network exists to produce, so it gets more than a count.
# Two breakdowns, because they answer different questions: which page did
# the persuading, and which seller took the handover. pagePath is a built-in
# dimension and `hop` was registered as a custom one, so neither needs
# anything added in the GA interface.
if seen.get("ticket_click"):
    # Host as well as path: the sites share one property, and "/" on its
    # own would merge the front pages of all of them.
    pages, _ = series(["hostName", "pagePath"], ["eventCount"], limit=10, event="ticket_click")
    lines += ["<b>Ticket clicks · pages</b>", "<pre>"]
    for k, m in sorted(pages.items(), key=lambda kv: -kv[1][0])[:10]:
        # A run page's URL is long and its tail is the part that identifies
        # it, so when it will not fit, keep the tail.
        url = k[0] + k[1]
        if len(url) > 30:
            url = "…" + url[-29:]
        lines.append(f"{url:<31}{int(m[0]):>4}")
    lines.append("</pre>")

    sellers, _ = series(["customEvent:hop"], ["eventCount"], limit=10, event="ticket_click")
    lines += ["<b>Ticket clicks · sellers</b>", "<pre>"]
    for k, m in sorted(sellers.items(), key=lambda kv: -kv[1][0])[:10]:
        lines.append(f"{k[0][:26]:<27}{int(m[0]):>4}")
    lines.append("</pre>")


# --- Search Console ----------------------------------------------------
# Week and month only. Search Console publishes a day two or three days
# late, so a 24-hour figure would be a zero every afternoon; the week here
# is the last whole seven days it has, said with its dates, not GA's week.
#
# The same read checks that every site can be found at all. A host that is
# not a property, or whose sitemap Google never fetched, looks healthy in
# every other number above — dst.llc went five weeks like that and eleven
# hosts were never added — so those lead the section, and a quiet week says
# in one line that they were checked. Thresholds match tools/idx-check.mjs.
GSC = "https://www.googleapis.com/webmasters/v3"
GSC_LAG = 3
NEVER_READ_DAYS, STALE_READ_DAYS = 7, 21


def repo_hosts():
    """The hosts in tools/hosts.mjs, read as text: it is a JS module, and
    this list is the one thing Python needs from it."""
    src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "hosts.mjs")).read()
    return re.findall(r':\s*"([^"]+)"', src.split("export const HOSTS = {", 1)[1].split("};", 1)[0])


def search_console():
    from google.oauth2 import service_account
    from google.auth.transport.requests import AuthorizedSession
    s = AuthorizedSession(service_account.Credentials.from_service_account_file(
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"],
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"]))

    def get(path):
        r = s.get(GSC + path, timeout=30)
        r.raise_for_status()
        return r.json()

    sites = [e["siteUrl"] for e in get("/sites").get("siteEntry", [])
             if e["permissionLevel"] != "siteUnverifiedUser"]
    host_of = {site: urlparse(site).hostname or site.removeprefix("sc-domain:") for site in sites}
    days = 7 if PERIOD == "week" else 30
    end = (NOW - timedelta(days=GSC_LAG)).date()
    start, prev_start = end - timedelta(days=days - 1), end - timedelta(days=2 * days - 1)
    utc_now = datetime.now(timezone.utc)
    age = lambda iso: (utc_now - datetime.fromisoformat(iso.replace("Z", "+00:00"))).days

    alerts, waiting, totals, queries = [], 0, {}, []
    for host in repo_hosts():
        if host not in host_of.values():
            alerts.append(f"{host} — not in Search Console")
    for site in sites:
        host, q = host_of[site], f"/sites/{quote(site, safe='')}"
        maps = get(q + "/sitemaps").get("sitemap", [])
        if not maps:
            alerts.append(f"{host} — no sitemap submitted")
        for m in maps:
            name = urlparse(m["path"]).path.lstrip("/")
            if int(m.get("errors", 0)):
                alerts.append(f"{host} — {name}: {m['errors']} errors")
            if not m.get("lastDownloaded") and m.get("lastSubmitted"):
                if age(m["lastSubmitted"]) > NEVER_READ_DAYS:
                    alerts.append(f"{host} — {name} never read, submitted {m['lastSubmitted'][:10]}")
                else:
                    waiting += 1
            elif m.get("lastDownloaded") and age(m["lastDownloaded"]) > STALE_READ_DAYS:
                alerts.append(f"{host} — {name} last read {m['lastDownloaded'][:10]}")

        def query(dims, since, limit):
            r = s.post(GSC + q + "/searchAnalytics/query", timeout=30, json={
                "startDate": since.isoformat(), "endDate": end.isoformat(),
                "dimensions": dims, "rowLimit": limit})
            r.raise_for_status()
            return r.json().get("rows", [])

        # By date over both periods: one call, and a total that keeps the
        # clicks Search Console hides from the per-query rows.
        cur, prv = [0, 0], [0, 0]
        for row in query(["date"], prev_start, 100):
            bucket = cur if row["keys"][0] >= start.isoformat() else prv
            bucket[0] += int(row["clicks"])
            bucket[1] += int(row["impressions"])
        totals[host] = (cur, prv)
        if cur[1]:
            queries += [(int(row["clicks"]), int(row["impressions"]), row["position"], row["keys"][0], host)
                        for row in query(["query"], start, 10)]

    fmt = lambda d: f"{d.day} {d:%b}"
    out = ["", f"<b>Search</b> · {fmt(start)}–{fmt(end)}, vs the {days} days before"]
    if alerts:
        out += ["<b>Needs attention</b>", "<pre>"] + [escape(a) for a in alerts] + ["</pre>"]
    else:
        out.append(f"<i>All {len(sites)} properties checked: none missing, no sitemap stuck.</i>")
    if waiting:
        out.append(f"<i>{waiting} sitemap{'s' if waiting > 1 else ''} submitted this week, not read yet.</i>")
    clicks = sum(c[0] for c, _ in totals.values()), sum(p[0] for _, p in totals.values())
    shows = sum(c[1] for c, _ in totals.values()), sum(p[1] for _, p in totals.values())
    out += ["<pre>", f"{'clicks':<12}{clicks[0]:>6}   {delta(*clicks)}",
            f"{'impressions':<12}{shows[0]:>6}   {delta(*shows)}"]
    ranked = sorted(((h, c, p) for h, (c, p) in totals.items() if c[1]), key=lambda t: (-t[1][0], -t[1][1]))
    if ranked:
        out.append("")
        for h, c, p in ranked[:12]:
            out.append(f"{h:<22}{c[0]:>4} /{c[1]:>6}")
    out.append("</pre>")
    if queries:
        # Clicks first, then the impressions a query is earning without
        # them — that second kind is where a page is one rewrite from traffic.
        out += ["<b>Search · queries</b> (clicks / impressions, position)", "<pre>"]
        for c, i, pos, k, h in sorted(queries, key=lambda t: (-t[0], -t[1]))[:10]:
            out.append(f"{escape(k[:24]):<25}{c:>3} /{i:>5}  {pos:>4.1f}")
        out.append("</pre>")
    return out


if PERIOD != "day":
    try:
        lines += search_console()
    except Exception as e:
        # The GA half is already written; a Search Console outage costs this
        # section, not the digest.
        lines += ["", f"<i>Search Console unavailable: {escape(type(e).__name__)}</i>"]

text = "\n".join(lines)

if "--dry-run" in sys.argv:
    print(text)
    raise SystemExit

token, chat = os.environ.get("REPORTS_TELEGRAM_API_KEY"), os.environ.get("REPORTS_TELEGRAM_CHAT_ID")
if not token or not chat:
    raise SystemExit("REPORTS_TELEGRAM_API_KEY / REPORTS_TELEGRAM_CHAT_ID not set — source ~/dst/.env first")

req = urllib.request.Request(
    f"https://api.telegram.org/bot{token}/sendMessage",
    data=json.dumps({"chat_id": chat, "text": text, "parse_mode": "HTML",
                     "disable_web_page_preview": True}).encode(),
    headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as r:
    body = json.load(r)
print(f"{PERIOD}: sent, message_id={body['result']['message_id']}" if body.get("ok") else "FAILED: " + str(body))
