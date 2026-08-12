// GET https://api.dst.llc/ - trivial health check so a browser/curl hit on
// the bare domain confirms the deployment is live, instead of a 404.
export default function handler(req, res) {
  res.status(200).json({ ok: true, service: 'api.dst.llc' });
}
