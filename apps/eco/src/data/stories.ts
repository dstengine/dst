// One entry per planting/initiative. Every field beyond slug, title and
// body is optional by design — some stories will have a photo or a mapped
// location, some won't, and the page has to handle both without a hole
// where the missing field would go.
export interface Story {
  slug: string;
  title: string;
  species?: string;
  plantedBy?: string;
  location?: { name: string; mapUrl?: string };
  photo?: string;
  photoAlt?: string;
  body: string[];
}

export const stories: Story[] = [
  {
    slug: "shilovka-shaytanka",
    title: "Douglas fir saplings, Sverdlovsk region",
    species: "Douglas fir",
    plantedBy: "Max F.",
    location: {
      name: "Nikolo-Pavlovsky district, Sverdlovsk region — near Shilovka, on the Shaytanka river",
      mapUrl: "https://www.google.com/maps/place/57°46'10.6%22N+60°08'25.6%22E/@57.7695733,60.1353227,928m/data=!3m1!1e3!4m4!3m3!8m2!3d57.769599!4d60.140435",
    },
    photo: "/stories/douglas-fir-shilovka-01.jpg",
    photoAlt: "A young Douglas fir sapling freshly planted in tall grass near the Shaytanka river.",
    body: [
      "DST's founder donated to a friend, Max F., to source and buy Douglas fir saplings for planting in the Urals — chosen for how long they live and what they do for the soil around them.",
      "Some of the saplings went into the ground in the Nikolo-Pavlovsky district of Sverdlovsk region, about 50km from the village of Shilovka, on the bank of the Shaytanka river.",
      "The area around Shilovka is sparsely populated and sits on the edge of natural forest. Shilovka itself is known for its church; the Shaytanka is known, to a smaller circle, for its ice-hole bathing on Epiphany. Despite the region's broader environmental problems, it's one of the more comfortable spots for these trees.",
      "Transport ran into problems for reasons outside our control. The trees were stabilized at home and, despite looking dry, are showing the signs of life they need to keep growing once they're back outdoors. Photos here will be updated as they grow and as the site becomes possible to visit again.",
      "A second batch is being grown on for now and will be planted later.",
    ],
  },
];
