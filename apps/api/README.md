# @dst/api

Central lead webhook, deployed at `api.dst.llc`. No framework - this is
plain [Vercel Functions](https://vercel.com/docs/functions): every file
under `api/` becomes a route at the matching path.

## Routes

- `GET /` - health check, returns `{ ok: true }`
- `POST /api/v1/lead` - accepts the universal lead DTO (see
  `~/mind/local/dubai/dstengine/dtos/lead.dto.md`) and fans it out,
  unchanged, to every configured adapter.

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
(`lib/adapters/*.mjs`), each just a `(lead) => Promise<{ok, ...}>` function.
Only Telegram exists today. Adding Planfix/Uspacy/DKey/MongoDB later is a new
file in `lib/adapters/` plus one line in the `adapters` array - no change to
the DTO or the route itself (see `~/mind/local/dubai/crm/webhook.md`).

## Environment variables

Set these in the Vercel project's dashboard (Settings → Environment
Variables), not in a committed file:

| Variable | Required for | Notes |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Telegram adapter | Create via [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Telegram adapter | The chat/channel the bot should post into |

Without these, `/api/v1/lead` still returns `200`/`207` but the Telegram
adapter reports `ok: false` in the response instead of throwing - a missing
adapter never blocks the lead from being accepted.

## Deploying

Not deployed yet. To connect:

1. In the Vercel dashboard, "Add New Project" → import `dstengine/dst` →
   set the project's Root Directory to `apps/api`.
2. Add the two env vars above.
3. Project Settings → Domains → add `api.dst.llc`, then add the DNS record
   Vercel gives you wherever `dst.llc`'s DNS is managed.

## Tests

```bash
npm test --workspace=apps/api
```
