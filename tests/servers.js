// Each site is its own origin in production, so the layout tests serve each
// one on its own port rather than mounting them under paths. Shared by
// playwright.config.js (to start them) and the specs (to address them).
export const PORTS = {
  dst: 4331,
  llc: 4332,
  visas: 4333,
  riviera: 4334,
  mbr: 4335,
};

export const baseUrl = (site) => `http://localhost:${PORTS[site]}`;
