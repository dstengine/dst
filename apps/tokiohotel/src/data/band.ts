// Who the band is, and the one date every "last checked" line prints. One
// constant, so the site cannot claim two different freshnesses on two pages.
export const checkedOn = "2026-09-04";

export interface Source {
  name: string;
  /** An outbound slug, resolved by /go/. Absent when the source is a page
      we could not verify resolves — a named source with no link beats a
      link that 404s. */
  url?: string;
  verifiedOn: string;
}

export const WIKIPEDIA: Source = {
  name: "Wikipedia: Tokio Hotel",
  url: "wikipedia-tokio-hotel",
  verifiedOn: checkedOn,
};

export const DISCOGRAPHY: Source = {
  name: "Wikipedia: Tokio Hotel discography",
  url: "wikipedia-discography",
  verifiedOn: checkedOn,
};

// The band's own site. The best source there is for a routing, and the one
// this site now leads with: it carries both tours, and it carried the second
// one before any listing did.
export const OFFICIAL: Source = {
  name: "tokiohotel.com",
  url: "tokiohotel-com",
  verifiedOn: checkedOn,
};

export const band = {
  name: "Tokio Hotel",
  formed: "2001",
  origin: "Magdeburg, Germany",
  formerName: "Devilish",
  members: [
    { name: "Bill Kaulitz", role: "vocals" },
    { name: "Tom Kaulitz", role: "guitar" },
    { name: "Georg Listing", role: "bass" },
    { name: "Gustav Schäfer", role: "drums" },
  ],
  /** The line every page can lean on: the same four people, twenty-five years. */
  lineupUnchangedSince: "2001",
};
