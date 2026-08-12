# @dst/api

Central lead webhook, deployed at `api.dst.llc`. No framework - this is
plain [Vercel Functions](https://vercel.com/docs/functions): every file
under `api/` becomes a route at the matching path.

## Routes

- `GET /api` - health check, returns `{ ok: true }` (files under `api/` are
  always routed with that prefix on Vercel - there's no bare `/`)
- `POST /api/v1/lead` - accepts the universal lead DTO (see
  `~/mind/local/dubai/dstengine/dtos/lead.dto.md`) and fans it out,
  unchanged, to every configured adapter.
- `POST /api/v1/lead/telegram`, `/api/v1/lead/planfix`, `/api/v1/lead/uspacy`
  - each adapter's own route, callable directly with the same DTO. `/api/v1/lead`
  calls these same handlers in-process for its fan-out, so the standalone
  route and the fan-out leg can never drift apart.

```json
{
  "lead": {
    "name": "Dev",
    "contacts": { "phone": "+971501234567" },
    "meta": { "source": "riviera" },
    "ref": { "domain": "riviera.dst.llc", "url": "https://riviera.dst.llc/" }
  }
}
```

At least one of `contacts.email` / `.phone` / `.telegram` / `.whatsapp` is
required; everything else is optional and passed through as-is.

## Adapters

`api/v1/lead.mjs` fans the lead out to a list of adapters
(`lib/adapters/*.mjs`), each just a `(lead) => Promise<{ok, ...}>` function,
paired with a standalone route at `api/v1/lead/<name>.mjs`. Telegram,
Planfix, and Uspacy exist today (Planfix/Uspacy are both a plain
webhook-URL POST of `{ lead }` - swap in the real endpoint via env var once
you have it). Adding DKey/MongoDB later is the same pattern: a new adapter
file, a new route file, one import + one array entry in `lead.mjs` (see
`~/mind/local/dubai/crm/webhook.md`).

## Environment variables

Set these in the Vercel project's dashboard (Settings → Environment
Variables), not in a committed file:

| Variable | Required for | Notes |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Telegram adapter | Create via [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Telegram adapter | The chat/channel the bot should post into |
| `PLANFIX_WEBHOOK_URL` | Planfix adapter | Planfix's inbound webhook URL for this account |
| `USPACY_WEBHOOK_URL` | Uspacy adapter | Uspacy.com's inbound webhook URL for this account |

Without these, `/api/v1/lead` still returns `200`/`207` but the affected
adapter reports `ok: false` in the response instead of throwing - a missing
adapter never blocks the lead from being accepted, and never blocks the
other adapters either.

## Deploying

Live as the `dst-api` Vercel project (same naming pattern as `dst-llc` →
`llc.dst.llc`, etc.), auto-deploying on push to `main`. `TELEGRAM_BOT_TOKEN`
/ `TELEGRAM_CHAT_ID` are set; `PLANFIX_WEBHOOK_URL` / `USPACY_WEBHOOK_URL`
still need real values once those webhook URLs exist.

## Tests

```bash
npm test --workspace=apps/api
```
