// Each site is its own origin in production, so the layout tests serve each
// one on its own port rather than mounting them under paths. Shared by
// playwright.config.js (to start them) and the specs (to address them).
export const PORTS = {
  dst: 4331,
  llc: 4332,
  visas: 4333,
  riviera: 4334,
  mbr: 4335,
  palmcentral: 4336,
  fwf: 4338,
  musical: 4339,
  nyc42: 4341,
  ldn: 4342,
  lnd: 4343,
  cmx: 4344,
  mxo: 4345,
  sol2go: 4346,
  vien: 4347,
  tick: 4348,
  aivideo: 4349,
  tea: 4350,
  l0n: 4351,
  aca: 4352,
  fest: 4353,
  random: 4354,
  // 4356, 4357 and 4359 were held by other sessions' ad-hoc preview servers
  // on 6 Nov 2026; a port in use here is reused by Playwright as it stands,
  // so a busy one would test someone else's site.
  zerocake: 4355,
  xmr0: 4358,
  irish: 4360,
};

/** Where a site's server is ready to be asked, when that is not "/".
    fest.one's was its hub at /festivals/ until 23 Oct 2026, when the hub
    moved to the root; every site answers at / now. */
export const HOME = {};

export const baseUrl = (site) => `http://localhost:${PORTS[site]}`;
