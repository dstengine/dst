#!/usr/bin/env python3
"""GA4 for the network, three levels: everything, each group, each host.

    python3 tools/ga.py [days]        default 28

One property carries all fourteen sites, so a host is a dimension rather
than a report of its own. The grouping below is the one that matters
editorially: the DST verticals are openly linked to each other, the rest
are not linked to DST or to one another, and a number that mixed them
would answer neither question.

Reads the service-account key from GA4_KEY or ~/dst/.secrets/ga4-reader.json.
"""
import os, sys, json
from collections import defaultdict
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression)

PROPERTY = "properties/548390990"
KEY = os.environ.get("GA4_KEY", os.path.expanduser("~/dst/.secrets/ga4-reader.json"))
os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS", KEY)
DAYS = f"{int(sys.argv[1]) if len(sys.argv) > 1 else 28}daysAgo"

GROUPS = {
    "DST network": ["dst.llc", "llc.dst.llc", "visas.dst.llc", "riviera.dst.llc",
                    "mbr.dst.llc", "palmcentral.dst.llc", "eco.dst.llc", "api.dst.llc"],
    "Independent": ["fwf.lol", "nyc42.lol", "ldn.lol", "lnd.lol", "cmx.lol",
                    "mxo.lol", "musical.today", "www.musical.today"],
}
# Anything not in a group is neither site nor group — a dev preview, a
# staging host, someone's proxy. It is reported, apart, rather than folded
# into a total it would quietly inflate.
KNOWN = {h for hs in GROUPS.values() for h in hs}

client = BetaAnalyticsDataClient()

def report(dims, mets, limit=100, host=None):
    kw = {}
    if host:
        kw["dimension_filter"] = FilterExpression(filter=Filter(
            field_name="hostName", string_filter=Filter.StringFilter(value=host)))
    r = client.run_report(RunReportRequest(
        property=PROPERTY, date_ranges=[DateRange(start_date=DAYS, end_date="today")],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets], limit=limit, **kw))
    return [([v.value for v in row.dimension_values],
             [v.value for v in row.metric_values]) for row in r.rows]

METRICS = ["sessions", "totalUsers", "screenPageViews",
           "engagedSessions", "averageSessionDuration"]

by_host = {d[0]: m for d, m in report(["hostName"], METRICS)}

def fmt(m):
    s, u, v, e, dur = (float(x) for x in m)
    eng = f"{e / s * 100:4.0f}%" if s else "   —"
    return f"{int(s):>7} {int(u):>7} {int(v):>7}  {eng}  {int(dur)//60}m{int(dur)%60:02d}s"

def total(hosts):
    acc = [0.0] * 5
    for h in hosts:
        if h not in by_host: continue
        m = [float(x) for x in by_host[h]]
        acc[0] += m[0]; acc[1] += m[1]; acc[2] += m[2]; acc[3] += m[3]
        acc[4] += m[4] * m[0]                      # duration is a mean: reweight
    acc[4] = acc[4] / acc[0] if acc[0] else 0
    return [str(x) for x in acc]

HEAD = f"{'':<24}{'sess':>7} {'users':>7} {'views':>7}  {'eng':>4}  {'avg':>6}"
out = [f"GA4 · property 548390990 · last {DAYS.replace('daysAgo',' days')}", ""]

everything = [h for h in by_host if h in KNOWN]
out += [HEAD, "-" * 60, f"{'ALL SITES':<24}{fmt(total(everything))}", ""]

for name, hosts in GROUPS.items():
    live = [h for h in hosts if h in by_host]
    if not live: continue
    out += [f"{name:<24}{fmt(total(live))}"]
    for h in sorted(live, key=lambda x: -float(by_host[x][0])):
        out += [f"  {h:<22}{fmt(by_host[h])}"]
    out += [""]

other = [h for h in by_host if h not in KNOWN]
if other:
    out += ["Not a site (dev previews, proxies) — excluded from every total above"]
    for h in sorted(other, key=lambda x: -float(by_host[x][0])):
        out += [f"  {h:<22}{fmt(by_host[h])}"]
    out += [""]

# Where the sessions come from, and what they land on. Network-wide: with
# these volumes a per-host breakdown would be a list of ones.
out += ["Top sources", ""]
for d, m in report(["sessionSource", "sessionMedium"], ["sessions"], limit=12):
    out += [f"  {(d[0] + ' / ' + d[1]):<38}{int(float(m[0])):>6}"]
out += ["", "Top landing pages", ""]
for d, m in report(["hostName", "landingPage"], ["sessions"], limit=15):
    out += [f"  {(d[0] + d[1]):<38}{int(float(m[0])):>6}"]

print("\n".join(out))
