// RushFrame, recommended at the top of the ComfyUI pages on the owner's word
// (3 Nov 2026): a Windows editor that runs ComfyUI for you, for the reader
// who wants the shot and not the node graph behind it.
//
// What the block says about it was read on 4 Nov 2026 from rushframe.online
// (its third-party licences page: ComfyUI, ComfyUI-LTXVideo and the LTX-2.3
// weights are downloaded to the user's machine; its EULA: a hardware check
// can block that install) and from the channel's 18–23 Oct Shorts (prompt,
// continue, a one-video one-audio timeline and export are in Free). The
// site offers a Windows x64 download and nothing else, so the block says
// Windows and sends anyone else to the site rather than promising a build.
//
// The episodes are its developer's own series, RushFrame Season Zero: one
// numbered episode a day at 01:00 UTC from 17 to 30 October 2026 (the 12th
// in two cuts), the 14th called the finale, then a Halloween special on the
// 31st that says the season is complete. The numbers of the 18 and 22 Oct
// episodes are counted from that cadence; the channel prints 9, 11, 12, 13
// and 14 itself, and the count agrees with each. Each id answered YouTube's
// oEmbed on 4 Nov 2026.
//
// The seven ComfyUI articles also carry a passage of their own about it,
// near the end of the body in packages/content/src/news/aivideo.ts. Those
// rest on the site's third-party licences register as recorded on 21 Oct
// 2026 (managed install: ComfyUI 0.31.0, ComfyUI-KJNodes, ComfyUI-LTXVideo,
// the LTX-2.3 22B checkpoint with its distilled LoRA and upscaler; no other
// video model). The register says it is to be matched against the shipped
// installer, so the passages date it. A new record means re-reading them.
// The hardware figures (VRAM, RAM, driver) appear only on Boosty and are
// left out.
//
// The rule applied to Russian sites: nothing of ours links Boosty, and no
// episode is shown whose own description does — which leaves out 24, 25
// and 29 Oct. The vendor's site (its Pro checkout) and the channel header
// do reach Boosty one click further on; the owner asked for the site and
// the channel, so those two links stay.
//
// The frames are YouTube's own vertical thumbnails (oar2.jpg), cropped to
// 3:4 and served from public/rushframe/ as avif and webp only — no jpeg, so
// they stay out of images.json — and served from here so they show where
// YouTube does not.
import type { NewsItem } from "@dst/content/types";

export const RUSHFRAME_URL = "https://rushframe.online/";
export const RUSHFRAME_CHANNEL = "https://www.youtube.com/@RushFrameAI/shorts";

// ComfyUI-tagged pages where RushFrame does not answer what the page is
// about. Vidu Q4 is a hosted model: the way to use it without a graph is
// Shengshu's own platform, which that page's button already offers, and
// RushFrame does not run it at all.
const NOT_HERE = new Set(["vidu-q4-preview-voice-references-4k"]);

/** Whether an article opens with the RushFrame block. */
export const showsRushFrame = (item: NewsItem): boolean =>
  !!item.tags?.includes("ComfyUI") && !NOT_HERE.has(item.slug);

export interface Episode {
  /** YouTube video id; also the frame's file name in public/rushframe/. */
  id: string;
  /** The /go/rushframe-<slug>/ hop. */
  slug: string;
  /** Where it sits in the season, as printed on the card. */
  ep: string;
  /** Publication day (UTC), as printed on the card. */
  day: string;
  /** Publication day in full, for the link title. */
  dayLong: string;
  /** The card's caption: what the episode shows. */
  label: string;
  /** The video's own title on YouTube, without its hashtags. */
  youtube: string;
  alt: string;
}

export const EPISODES: Episode[] = [
  {
    id: "8PLZxgSxIQM",
    slug: "no-node-graphs",
    ep: "Ep. 2",
    day: "18 Oct",
    dayLong: "18 October 2026",
    label: "ComfyUI without node graphs",
    youtube: "ComfyUI Without Node Graphs? Meet RushFrame",
    alt: "A raccoon in a hooded jacket at his desk, a RushFrame editor screen on the monitor behind him",
  },
  {
    id: "gyOkYviW6t4",
    slug: "lan-comfyui-server",
    ep: "Ep. 6",
    day: "22 Oct",
    dayLong: "22 October 2026",
    label: "A ComfyUI server on your network",
    youtube: "AI Video on a Weak PC? Use a LAN ComfyUI Server",
    alt: "The same raccoon at a laptop in a neon-lit room",
  },
  {
    id: "QcFjC2p8sB8",
    slug: "season-finale",
    ep: "Ep. 14",
    day: "30 Oct",
    dayLong: "30 October 2026",
    label: "The season finale",
    youtube: "When Your AI Movie Makes You a Jazz Star | RushFrame 14",
    alt: "A goose in a three-piece suit and round glasses, a glass of champagne in his hand, at the premiere",
  },
  {
    id: "waY3OpCA4uc",
    slug: "halloween-special",
    ep: "Special",
    day: "31 Oct",
    dayLong: "31 October 2026",
    label: "Nevermore, for Halloween",
    youtube: "NEVERMORE 🎃 | RushFrame Halloween Special | AI Short Film",
    alt: "Poe the raven in a gothic library, his claws over a glowing green ritual circle",
  },
];
