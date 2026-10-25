// Which app serves which host. One list, because two copies of it drift:
// the map is read both by tools/lastmod.mjs, which keys its output by host,
// and by tools/pipeline.mjs, which has to turn a host back into the app to
// rebuild. Key order is the order lastmod.json is written in, so it is the
// order of the root `build` script rather than alphabetical.
export const HOSTS = {
  dst: "dst.llc",
  llc: "llc.dst.llc",
  visas: "visas.dst.llc",
  riviera: "riviera.dst.llc",
  mbr: "mbr.dst.llc",
  palmcentral: "palmcentral.dst.llc",
  fwf: "fwf.lol",
  musical: "musical.today",
  eco: "eco.dst.llc",
  nyc42: "nyc42.lol",
  sol2go: "sol2go.lol",
  vien: "vien.lol",
  tick: "tick.am",
  ldn: "ldn.lol",
  lnd: "lnd.lol",
  cmx: "cmx.lol",
  mxo: "mxo.lol",
  tokiohotel: "tokiohotel.vvm.space",
  aivideo: "aivideo.zone",
  tea: "tea.ceo",
  l0n: "l0n.uk",
  aca: "acapulco.world",
  // RandomX guides, independent of the group.
  random: "random.directory",
  // Festival guides, served under fest.one through the archive's rewrite
  // (~/.claude/skills/event-page/BOOTSTRAP.md); the archive keeps / itself.
  fest: "fest.one",
};

/** The app behind a host, for turning a changed lastmod slice back into a
    workspace to rebuild. */
export const appOfHost = (host) =>
  Object.keys(HOSTS).find((app) => HOSTS[app] === host) ?? null;
