import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "rent-came-down-and-every-account-is-now-over-funded",
    site: "sol2go",
    image: "/covers/rent-came-down-and-every-account-is-now-over-funded.jpg",
    imageAlt: "A tall stack of flat violet paper coins with the top third lifted clear of the rest",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Rent came down, and every account is now over-funded",
    cardTitle: "Rent came down. Your accounts are over-funded",
    titleSeo: "Rent fell: how to reclaim excess SOL",
    summary:
      "Solana cut rent, so every existing account now holds more SOL than it needs. A new Token Program instruction takes the surplus out without closing anything — and this is only phase one of five.",
    date: "2026-09-04",
    category: "Upgrades",
    featured: 1,
    source: {
      name: "Solana Foundation",
      url: "https://solana.com/news/how-to-reclaim-excess-sol-after-rent-reduction",
      verifiedOn: "2026-09-06",
    },
    body: [
      "Rent on Solana is a deposit, not a fee: an account holds a minimum balance to stay alive, and gets it back when it closes. Lower the minimum and nothing breaks — but every account that was funded under the old rule is now carrying more SOL than it needs, and nobody is going to hand it back on their own.",
      "## What changed",
      "The Foundation's own framing: rent “is getting cheaper, and that means you and your users are now sitting on excess lamports that can be reclaimed.” This is the <strong>first phase of a five-phase rent reduction roll-out</strong>, so the same surplus will appear again, four more times.",
      "## How you get it out",
      "The Token Program gained a <strong>WithdrawExcessLamports</strong> instruction. It “recovers SOL sitting above the rent-exempt minimum from a token account, mint, or multisig account — without touching token balances and without closing the account.” The program computes the source account's rent-exempt floor and moves everything above it to a destination you name.",
      "It requires authorisation from the account's authority: the owner for a token account, the mint authority or the mint itself for a mint.",
      "## Why this is worth an afternoon",
      "Individually the amounts are small. In aggregate they are not: a protocol holding tens of thousands of token accounts has a real balance sheet line sitting in rent-exempt floors that no longer exist. The accounts that matter most are the ones you opened on behalf of users, because that surplus is theirs and they have no way to know it is there.",
      "## The part not yet published",
      "The announcement does not name the SIMD or the feature gate that carried the change, nor the old and new lamports-per-byte rates, nor the dates of the remaining four phases. We are not filling those in.",
    ],
    expertise:
      "The design decision worth noticing is that this is an instruction rather than an automatic refund. A protocol change that silently moved lamports out of accounts would be a change to balances that no wallet asked for, and on a chain where a rent-exempt floor is load-bearing for account survival that is exactly the kind of automatic behaviour that produces closed accounts nobody intended to close. Making it opt-in puts the decision with whoever holds the authority — which also means that in five phases' time there will be a long tail of accounts nobody ever swept, and the total sitting in them will be a genuinely interesting number.",
  },

  {
    slug: "before-solana-gets-150ms-finality-two-gates-had-to-open",
    site: "sol2go",
    image: "/covers/before-solana-gets-150ms-finality-two-gates-had-to-open.jpg",
    imageAlt: "Two narrow violet paper gates standing open in front of a long mint arrow crossing the frame",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Before Solana gets 150ms finality, two gates had to open",
    cardTitle: "The two gates Alpenglow needed first",
    titleSeo: "What Alpenglow needed before 150ms",
    summary:
      "Alpenglow targets roughly 150ms finality against today's 12.8 seconds. Two prerequisite feature gates went live on mainnet in July; the consensus change itself reaches devnet in Agave 4.3.",
    date: "2026-09-02",
    category: "Upgrades",
    featured: 2,
    source: {
      name: "Solana Foundation",
      url: "https://solana.com/upgrades/alpenglow",
      verifiedOn: "2026-09-06",
    },
    body: [
      "Alpenglow is the largest change to how Solana agrees with itself since the chain launched, and the headline number is the one everyone repeats. The number underneath it is the one that explains why this has taken a year.",
      "## The numbers",
      "The Foundation states the target plainly: “roughly 150ms finality, compared with Solana's current roughly 400ms pre-confirmation latency and 12.8-second TowerBFT finality.” The 400ms figure is the one applications already feel. The 12.8 seconds is the one that matters to anything settling value, and it is the one Alpenglow is aimed at.",
      "More broadly, Alpenglow “makes changes to how Solana thinks about blockspace, finality, voting, and rewards” — four things at once, which is why it does not ship as a single switch.",
      "## What already happened",
      "<strong>BLS Pubkey Management in Vote Account (SIMD-0387)</strong> activated on mainnet on <strong>8 July 2026</strong>. The <strong>Validator Admission Ticket (SIMD-0357)</strong> activated on mainnet on <strong>22 July 2026</strong>. Neither turns Alpenglow on. They are the plumbing it needs to exist before the consensus change can be switched at all.",
      "## What has not happened yet",
      "Devnet activation is listed against <strong>Agave 4.3</strong>, and expected mainnet activation against <strong>Q3 2026</strong> — a quarter that ends this month. Read those two lines together and the honest summary is that the schedule is tight and the page has not been updated to say otherwise.",
      "## What to do about it",
      "If you run a validator, the July gates are already behind you and 4.3 is the release to be reading. If you build applications, nothing in your code changes on activation day — but a finality budget you wrote around 12.8 seconds is a design assumption worth revisiting rather than inheriting.",
    ],
    expertise:
      "The interesting thing about a two-stage rollout like this is what it tells you about the risk model. Both July gates are additive: a BLS public key in a vote account and an admission ticket are new fields and new checks, and neither changes what the network agrees is true. The consensus switch is not additive, and it is the only part that can split the network if it goes wrong — so it is deliberately last, deliberately on devnet first, and deliberately separated from the plumbing by three months. Anyone reading the July activations as “Alpenglow is live” has read the changelog and not the design.",
  },
];
