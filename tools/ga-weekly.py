#!/usr/bin/env python3
"""The Friday digest: seven days of GA4, posted to Telegram.

    python3 tools/ga-weekly.py            send
    python3 tools/ga-weekly.py --dry-run  print, send nothing

Deliberately not a copy of tools/ga.py. That one is for reading at a
terminal, where a wide table is fine; this is read on a phone, where it is
not, so the shape is different: a handful of totals, the hosts that moved,
and the events that decide whether the week was any good.

Two numbers lead rather than sessions. Most of what this property records
is automated traffic — direct, one page, no scroll, gone — and a sessions
figure that counts it says the week was busy when it was not. Engaged
sessions is the honest headline; sessions is kept beside it so the gap
stays visible instead of being quietly averaged away.

Credentials: GA4_KEY or ~/dst/.secrets/ga4-reader.json for the read,
REPORTS_TELEGRAM_API_KEY / REPORTS_TELEGRAM_CHAT_ID from ~/dst/.env for
the send. Nothing is printed that would put a secret in a log.
"""
import os, sys, json, urllib.request
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression)

PROPERTY = "properties/548390990"
os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS",
                      os.environ.get("GA4_KEY", os.path.expanduser("~/dst/.secrets/ga4-reader.json")))

# This week against the one before it. Both ranges go to GA in a single
# request so the comparison can never straddle two different reads.
THIS, PREV = DateRange(start_date="7daysAgo", end_date="today"), DateRange(start_date="14daysAgo", end_date="8daysAgo")
client = BetaAnalyticsDataClient()

def report(dims, mets, limit=100, ranges=(THIS,), event=None):
    kw = {}
    if event:
        kw["dimension_filter"] = FilterExpression(filter=Filter(
            field_name="eventName", string_filter=Filter.StringFilter(value=event)))
    r = client.run_report(RunReportRequest(
        property=PROPERTY, date_ranges=list(ranges),
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets], limit=limit, **kw))
    # With two ranges GA appends a dateRange dimension to every row; the
    # caller gets it as the last dimension value rather than having to know.
    return [([v.value for v in row.dimension_values], [v.value for v in row.metric_values])
            for row in r.rows]

def delta(now, before):
    """Week-on-week, as a sign and a percentage — or '—' when last week was
    zero, because a percentage change from nothing is a division, not news."""
    if not before:
        return "new" if now else "—"
    pct = (now - before) / before * 100
    return f"{pct:+.0f}%"

# --- the week ---------------------------------------------------------
MET = ["sessions", "engagedSessions", "screenPageViews", "totalUsers"]
weeks = {d[-1]: [float(x) for x in m] for d, m in report([], MET, ranges=(THIS, PREV))}
cur, prv = weeks.get("date_range_0", [0]*4), weeks.get("date_range_1", [0]*4)

lines = ["<b>DST network · week to date</b>", ""]
for i, label in enumerate(["sessions", "engaged", "views", "users"]):
    lines.append(f"{label:<10}{int(cur[i]):>6}   {delta(cur[i], prv[i])}")
share = cur[1] / cur[0] * 100 if cur[0] else 0
lines.append(f"{'engaged %':<10}{share:>5.0f}%")

# --- hosts, ranked by engaged sessions --------------------------------
rows = [(d[0], float(m[1]), float(m[0])) for d, m in report(["hostName"], MET)]
rows = [r for r in rows if not r[0].startswith(("localhost", "127."))]
rows.sort(key=lambda r: (-r[1], -r[2]))
lines += ["", "<b>Hosts</b> (engaged / sessions)", "<pre>"]
for host, eng, sess in rows[:12]:
    lines.append(f"{host:<22}{int(eng):>4} /{int(sess):>5}")
lines.append("</pre>")

# --- the events that decide whether the week was any good -------------
WATCH = ["ticket_click", "generate_lead", "lead_failed", "form_start", "cta_click", "outbound_click"]
seen = {d[0]: int(float(m[0])) for d, m in report(["eventName"], ["eventCount"], limit=200)}
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
    # Host as well as path: fourteen sites share one property, and "/" on
    # its own would merge the front pages of all of them.
    pages = report(["hostName", "pagePath"], ["eventCount"], limit=10, event="ticket_click")
    lines += ["<b>Ticket clicks · pages</b>", "<pre>"]
    for d, m in pages:
        # A run page's URL is long and its tail is the part that identifies
        # it, so when it will not fit, keep the tail.
        url = d[0] + d[1]
        if len(url) > 30:
            url = "…" + url[-29:]
        lines.append(f"{url:<31}{int(float(m[0])):>4}")
    lines.append("</pre>")

    sellers = report(["customEvent:hop"], ["eventCount"], limit=10, event="ticket_click")
    lines += ["<b>Ticket clicks · sellers</b>", "<pre>"]
    for d, m in sellers:
        lines.append(f"{d[0][:26]:<27}{int(float(m[0])):>4}")
    lines.append("</pre>")

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
print("sent, message_id=" + str(body["result"]["message_id"]) if body.get("ok") else "FAILED: " + str(body))
