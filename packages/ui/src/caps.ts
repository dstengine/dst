// Text a stylesheet sets in capitals, capitalised here first where CSS
// would spell it wrong. ICU knows that Eastern Armenian writes the
// ligature "և" as "ԵՎ" in capitals, but the browsers' `text-transform:
// uppercase` (even under lang="hy-AM") and V8's toLocaleUpperCase("hy")
// never ask it for Armenian, so both print "ԵՒ", the classical spelling.
// Every Armenian page of the network is written for readers in Armenia,
// whose capitals spell it "ԵՎ": "ԵՐԵՎԱՆ", not "ԵՐԵՒԱՆ". A string holding
// "և" therefore arrives in capitals already and the stylesheet's uppercase
// has nothing left to change; any other string comes back as it went in,
// and CSS does the rest.
export function caps(text: string): string {
  return text.includes("և") ? text.replaceAll("և", "ԵՎ").toUpperCase() : text;
}
