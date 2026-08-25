export const site = {
  siteName: "Azizi Riviera",
  titleSuffix: "Azizi Riviera Guide",
  complianceNote:
    "Independent local guide, not affiliated with Azizi Developments. Amenities, businesses, and transit details change — confirm specifics before relying on them.",
  partnerDisclosure: true,
  // Default page opener for the whole site. Any page can override it by
  // setting its own `image` (and `imageAlt`) in content.ts.
  headerImage: "/riviera.jpg",
  headerImageAlt:
    "Illustration of the Azizi Riviera promenade at night — a generated image, not a photograph of the development.",
  // Machine-made, of no particular building. Said on the page rather than
  // only in the alt text, since an opener this size reads as a photograph.
  headerImageKind: "generated" as const,
};
