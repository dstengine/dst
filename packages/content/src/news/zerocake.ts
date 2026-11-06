import type { NewsItem } from "../types.ts";

// zerocake.org: Monzero (XMZ) in Cake Wallet. Guides rather than news — what
// the integration patch does stays true while its pull request moves — filed
// under /guides/. Every entry carries one or two of three subjects, Network,
// Cake Wallet and Security; the subject pages (apps/zerocake/src/sections.ts)
// are built from those tags.
//
// Where the facts come from: every claim about the patch comes from the
// patch series itself and its pull request text. Facts about Monzero come
// from the project's own chain specification and README. Builds, tests and
// node queries we ran ourselves say they are ours, with the machine and the
// toolchain. Status words ("not submitted yet") live in the body, never in a
// title or a summary. Nothing here is offered for download: the guides
// describe the build, they do not distribute it. No prices.

export const items: NewsItem[] = [

  {
    slug: "monzero-in-cake-wallet",
    createdAt: "2026-11-06T06:05:00+04:00",
    updatedAt: "2026-11-06T06:05:00+04:00",
    site: "zerocake",
    featured: 1,
    title: "What the Monzero patch adds to Cake Wallet",
    summary:
      "A six-commit patch adds Monzero (XMZ) to Cake Wallet as a new wallet type: a copy of the Wownero integration that follows Monero where Wownero falls short.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Cake Wallet"],
    action: {
      url: "https://github.com/cake-tech/cake_wallet",
      label: "Cake Wallet on GitHub",
      title: "Cake Wallet's open-source repository, where the Monzero pull request is meant to go",
      icon: "code",
    },
    source: {
      name: "The six-commit Monzero patch series for Cake Wallet and its pull request text",
      url: "https://github.com/cake-tech/cake_wallet",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Cake Wallet is an open-source, non-custodial wallet for Monero and a number of other coins, published as cake-tech/cake_wallet on GitHub. The patch this site describes adds <strong>Monzero (XMZ)</strong> to it as a new wallet type. It is our patch: the people who write this site prepared it. It is not in any version of Cake Wallet that has been released, and it has not been submitted yet — the <a href=\"/guides/monzero-cake-wallet-pull-request/\" title=\"The Monzero pull request to Cake Wallet: the six commits and the monero_c change it waits on\">pull request guide</a> has where it stands.",
      "## Built on the Wownero integration",
      "Cake Wallet already carries another Monero-family coin, Wownero, in a package called <code>cw_wownero</code>. The Monzero package, <code>cw_monzero</code>, is a copy of it with the names changed — Wownero to Monzero, WOW to XMZ — and the app's Monzero glue is a copy of its Wownero glue. The pull request text gives the reason: a reviewer can diff the two packages file by file and see only what differs. Wownero's own <span class=\"nowrap\">14-word</span> seed code is left out; Monzero uses Monero's standard word lists only.",
      "## What it adds",
      "<strong>The wallet package.</strong> <code>cw_monzero</code> runs on the Monzero library from monero_c, the project Cake Wallet builds its Monero-family wallets from. It holds the wallet service and the wallet, accounts and subaddresses, transaction history, unspent coins, the balance, pending transactions, the mnemonic word lists in <span class=\"nowrap\">ten languages</span> and the connection to a node.",
      "<strong>The coin.</strong> In Cake Wallet's shared core: a wallet type called Monzero, a currency called XMZ with <span class=\"nowrap\">11 decimal places</span>, card designs for the balance screen, a payment link of the form <code>monzero:&lt;address&gt;?tx_amount=</code>, and a way to estimate a block height from a date when a wallet is restored.",
      "<strong>The app.</strong> Monzero is handled everywhere Wownero is: creating and restoring wallets, sending and fees, unspent coins, accounts and addresses, the dashboard and the menu, QR codes, contacts and settings. Addresses are checked against the pattern of a Monzero address, which starts with F and is <span class=\"nowrap\">95 characters</span> long, or 106 for an integrated address. A transaction's details link to the block explorer on monzero.org. A settings migration, <span class=\"nowrap\">number 73</span>, adds the Monzero node list and makes node.monzero.org on <span class=\"nowrap\">port 6175</span> the default; the <a href=\"/guides/monzero-nodes/\" title=\"Monzero nodes: the ports, the default node and what plain-HTTP RPC exposes\">nodes guide</a> has what that connection is.",
      "<strong>Exchange.</strong> No exchange provider in Cake Wallet trades XMZ, so for a Monzero wallet the exchange screen falls back to a Monero-to-Bitcoin pair.",
      "<strong>Icons.</strong> Placeholders — a dark circle with an M — until the official Monzero logo replaces them.",
      "<strong>The build.</strong> Scripts that build the Monzero library, <code>libmonzero_wallet2_api_c</code>, from monero_c, and on macOS a step that copies the libraries it was linked against next to it so that it loads inside the sandboxed app. The <a href=\"/guides/monzero-cake-wallet-macos-build/\" title=\"How the Monzero build of Cake Wallet was made and tested on an Apple Silicon Mac\">build guide</a> has how that went.",
      "## Where it follows Monero instead",
      "Copying Wownero brought three things that are right for Wownero and wrong for a coin people are meant to keep using. Three of the six commits replace them with what Cake Wallet does for Monero.",
      "<strong>Opening a wallet.</strong> Wownero is deprecated in Cake Wallet, so its code throws a deprecation error every time a wallet is opened. Copied as it was, a Monzero wallet could be created and never opened again. Dart's static analysis found it. The second commit opens Monzero wallets normally and, if that fails, retries the way the Monero code does — restore the cache files, then remove the cache, then give up — instead of Wownero's retry with no limit.",
      "<strong>The end of a sync.</strong> The sync listener copied from Wownero lacks two fixes the Monero code received, Cake Wallet pull requests 2377 and 3575. In the app, a Monzero wallet reopened after a full sync could stay at “Attempting sync”. The fifth commit ports the Monero logic: wait while the node's height still reads 0, take the higher of the node's height and the wallet's, and report again every five ticks even when nothing has changed.",
      "<strong>Seeds.</strong> Cake Wallet has no BIP39 for Wownero; it has BIP39 for Monero. The sixth commit gives Monzero the Monero BIP39 code unchanged, so a new Monzero wallet can have a classic <span class=\"nowrap\">25-word</span> seed or a BIP39 phrase. Polyseed is not offered for new Monzero wallets; the restore screen still accepts a Polyseed, as before, though restoring one has not been tested. That choice has a consequence for anyone who also holds Monero, and the <a href=\"/guides/monzero-bip39-seeds/\" title=\"Why one BIP39 phrase gives the same keys on Monero and Monzero, and what to do about it\">BIP39 guide</a> explains it.",
    ],
    faq: [
      {
        q: "Does Cake Wallet support Monzero?",
        a: "Not in any version Cake Wallet has released. Monzero support exists as a six-commit patch prepared as a pull request to cake-tech/cake_wallet; as of 6 November 2026 it had not been submitted, and it depends on a separate change to monero_c.",
      },
      {
        q: "Why is the Monzero integration a copy of Wownero's?",
        a: "Following the Wownero integration file for file lets a reviewer diff cw_monzero against cw_wownero and see only the renames. Where Wownero's code is wrong for Monzero — the deprecation error on opening a wallet, the sync listener, the missing BIP39 — the patch uses Cake Wallet's Monero code instead.",
      },
      {
        q: "Can I exchange XMZ inside Cake Wallet?",
        a: "No exchange provider in Cake Wallet lists XMZ. In the patch, the exchange screen of a Monzero wallet falls back to a Monero-to-Bitcoin pair.",
      },
    ],
  },

  {
    slug: "monzero-bip39-seeds",
    createdAt: "2026-11-06T06:00:00+04:00",
    updatedAt: "2026-11-06T06:00:00+04:00",
    site: "zerocake",
    featured: 2,
    title: "Monzero BIP39 seeds: one phrase, the same keys as Monero",
    summary:
      "In Cake Wallet's Monzero patch a BIP39 phrase uses Monero's path, m/44'/128'/0'/0/0, so one phrase gives the same keys on both coins. Why Monzero needs its own.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Security", "Cake Wallet"],
    source: {
      name: "Commit 6 of the Monzero patch series for Cake Wallet, its tests and pull request text; Monzero README (Nightglass-Protocol1/monzero on GitHub)",
      url: "https://github.com/Nightglass-Protocol1/monzero",
      verifiedOn: "2026-11-06",
    },
    body: [
      "BIP39 is the standard for the word-list recovery phrases most Bitcoin wallets use. Monero's classic seed is a different thing, <span class=\"nowrap\">25 words</span> long, but Cake Wallet also lets a Monero wallet be made from a BIP39 phrase. The sixth commit of the Monzero patch gives Monzero exactly the same code: the file that does it, <code>bip39_seed.dart</code>, and its test are copies of Cake Wallet's Monero ones. A new Monzero wallet can be made with a BIP39 phrase, and a <span class=\"nowrap\">12-,</span> <span class=\"nowrap\">18- or</span> <span class=\"nowrap\">24-word</span> phrase can be restored; a <span class=\"nowrap\">12-word</span> phrase switches the restore form to BIP39 and then asks for a restore height.",
      "## How a phrase becomes a Monzero wallet",
      "The phrase, with its passphrase if there is one, becomes a BIP39 seed. The seed goes through BIP32 key derivation on the secp256k1 curve to the path <code>m/44'/128'/0'/0/0</code>, where the third figure is the account. The private key at the end of that path is reduced modulo the order of the ed25519 group and becomes the spend key of a classic <span class=\"nowrap\">25-word</span> seed. From there on the wallet is an ordinary Monero-style wallet. The app keeps the BIP39 phrase and the passphrase in the wallet's cache, so that it can show the phrase back when asked for the seed.",
      "## Why the keys are Monero's",
      "In that path, 128 is Monero's coin type in SLIP-0044, the registry that gives each coin its own number so that one phrase yields different keys for each. Monzero has no number of its own, and the patch keeps 128 on purpose, so that a phrase works wherever Monero's BIP39 derivation does. The pull request text states the consequence plainly: <strong>one phrase gives the same <span class=\"nowrap\">25-word</span> seed, and so the same keys, on Monero and on Monzero.</strong>",
      "The same is true of a classic <span class=\"nowrap\">25-word</span> Monero seed, since Monzero uses Monero's word lists and derives its keys from them in the same way. The patch's tests depend on it. They restore Cake Wallet's own Monero test phrases as Monzero wallets and expect Monero's test addresses back, re-encoded for Monzero: decode the address, change the network prefix from 18 to 86, recompute the Keccak checksum.",
      "## What that means",
      "<strong>One address gives the other away.</strong> A Monero address and a Monzero address made from the same phrase carry the same two public keys; only the prefix and the checksum differ. Anyone who has one can compute the other, exactly as the test does, and tie the Monzero wallet to the Monero one.",
      "<strong>One secret guards both.</strong> Whoever learns the phrase controls the funds on both networks. Typing a Monero phrase into Monzero software puts the Monero funds behind software that, by Monzero's own README, has not been independently audited.",
      "<strong>Monzero says not to.</strong> Its README asks users never to reuse a Monero wallet file, private key or recovery seed with Monzero, and not to import a seed used on another CryptoNote-derived network.",
      "So the safe way to use the feature is the way it was built to be used: a <strong>new</strong> phrase for a Monzero wallet, written down and kept for that wallet alone. What the shared derivation buys is portability — a Monzero phrase made this way can be restored by any Monzero wallet that derives BIP39 the way Monero wallets do — not a licence to reuse a Monero phrase.",
      "A BIP39 passphrase does change the keys; the tests check that it changes the address. It does not separate the two wallets, though. The phrase itself still has to be typed into the Monzero app, and a Monero wallet made from that phrase without a passphrase is open to whoever learns it.",
      "## Wallet groups",
      "Cake Wallet can group the wallets of several coins that share one seed. The patch counts Monzero as a BIP39 coin, so a Monzero wallet can join a group with a BIP39 seed — and a Monero wallet in the same group, made from the same phrase on the same path, has the same keys. Wallet groups are on the pull request's list of what has not been tested.",
      "## A bug the tests caught",
      "Restoring from a seed, as copied from the Wownero code, also cached the derived <span class=\"nowrap\">25-word</span> seed under the name the app reads first. A BIP39 wallet therefore showed its <span class=\"nowrap\">25-word</span> seed instead of the phrase it was made from. The nine new tests of the wallet service, modelled on Cake Wallet's Monero tests, caught it: three of the nine failed before the fix. Now only the passphrase is cached there, as in the Monero code. The <a href=\"/guides/monzero-cake-wallet-macos-build/\" title=\"The Monzero build of Cake Wallet on macOS: analysis, the 13 tests and the in-app check\">build guide</a> has the rest of the tests.",
    ],
    faq: [
      {
        q: "Can I use my Monero seed for Monzero?",
        a: "It would work — Monzero uses Monero's word lists and, in the Cake Wallet patch, Monero's BIP39 path, so the seed gives the same keys — but Monzero's own README says never to do it. The software has not been independently audited, and the shared keys let anyone link the two wallets' addresses. Make a new seed for Monzero.",
      },
      {
        q: "Which BIP39 derivation path does Monzero use in Cake Wallet?",
        a: "m/44'/128'/<account>'/0/0, the same path Cake Wallet uses for Monero. 128 is Monero's SLIP-0044 coin type; Monzero has none of its own, and the patch keeps 128 on purpose so that a phrase works wherever Monero's BIP39 derivation does.",
      },
      {
        q: "Does a Monzero wallet in Cake Wallet support Polyseed?",
        a: "Not for new wallets: in the patch, a new Monzero wallet gets either the classic 25-word seed or a BIP39 phrase. The restore screen still accepts a Polyseed, as it did before the BIP39 commit, but a Polyseed restore has not been tested.",
      },
    ],
  },

  {
    slug: "what-is-monzero",
    createdAt: "2026-11-06T05:55:00+04:00",
    updatedAt: "2026-11-06T05:55:00+04:00",
    site: "zerocake",
    featured: 3,
    title: "What is Monzero (XMZ)? The Monero fork, in figures",
    cardTitle: "What is Monzero (XMZ)?",
    summary:
      "Monzero (XMZ) is a fork of Monero v0.18.5.x with a chain of its own, started in August 2026: RandomX, 11 decimals, addresses that start with F, port 6175.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Network"],
    action: {
      url: "https://github.com/Nightglass-Protocol1/Monzero-source",
      label: "Monzero source code",
      title: "The source of Monzero's node, wallets and miner on GitHub",
      icon: "code",
    },
    source: {
      name: "Monzero chain specification and README (Nightglass-Protocol1/monzero and Monzero-source on GitHub); the Monzero pull request text for Cake Wallet",
      url: "https://github.com/Nightglass-Protocol1/monzero",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Monzero is a cryptocurrency built from the Monero codebase, with the ticker <strong>XMZ</strong>. The Cake Wallet patch this site describes calls it a fork of Monero <span class=\"nowrap\">v0.18.5.x</span>. Its own README calls it an independent privacy-coin network derived from Monero, with its own genesis block, network identity, ports, address prefixes and monetary policy, and says it is not affiliated with or endorsed by the Monero Project. Its first block is dated <span class=\"nowrap\">25 August 2026</span>: Monzero is a new chain that starts from a block of its own, not a copy of Monero's history.",
      "## The figures",
      "<strong>Decimals.</strong> <span class=\"nowrap\">11 decimal places</span>: one XMZ is 100,000,000,000 atomic units. The chain specification says eleven is the most that a <span class=\"nowrap\">100-million-coin</span> emission allows in the <span class=\"nowrap\">64-bit</span> amount type the code uses; twelve would overflow it.",
      "<strong>Addresses.</strong> Network prefixes 86 for standard addresses, 87 for integrated addresses and 88 for subaddresses. A standard address or a subaddress starts with <strong>F</strong> and is <span class=\"nowrap\">95 characters</span> long; an integrated address is <span class=\"nowrap\">106 characters</span>.",
      "<strong>Blocks.</strong> A target of one block every <span class=\"nowrap\">120 seconds</span>, mined with RandomX, the proof of work Monero uses, which is built for ordinary CPUs.",
      "<strong>Supply.</strong> A target primary emission of 100,000,000 XMZ, followed by a permanent tail emission of <span class=\"nowrap\">3.26 XMZ</span> a block. The specification records no hard-coded premine, and asks the team to disclose any coins it mined privately while bootstrapping the network.",
      "<strong>Ports.</strong> <span class=\"nowrap\">6174</span> for nodes talking to each other, <span class=\"nowrap\">6175</span> for the RPC that wallets talk to, and <span class=\"nowrap\">6176</span> for ZMQ. The public node is <code>node.monzero.org</code>, and its RPC is restricted and reached over plain HTTP; the <a href=\"/guides/monzero-nodes/\" title=\"Monzero nodes: the ports, the default node and what plain-HTTP RPC exposes\">nodes guide</a> has what that means.",
      "<strong>Seeds.</strong> The standard <span class=\"nowrap\">25-word</span> Monero mnemonic; the English list is the same <span class=\"nowrap\">1626 words</span>. Because the words and the keys behind them are Monero's, a Monero seed would open a Monzero wallet with the same keys — which is exactly what not to do, as the next section says.",
      "## Its own warning",
      "Monzero's README calls v1.0.0 its current stable release, and adds that it has not been independently audited. It says not to use it for funds one cannot afford to lose, and never to reuse a Monero wallet file, private key or recovery seed with it. The last of those matters in Cake Wallet in particular, where a BIP39 phrase is derived the way Monero's is; the <a href=\"/guides/monzero-bip39-seeds/\" title=\"Why one BIP39 phrase gives the same keys on Monero and Monzero, and what to do about it\">BIP39 guide</a> explains why.",
      "## Versions, and where the code lives",
      "Monzero's <strong>v1.0.0</strong> release line moved the network to hard fork 17, with the LWMA-1 difficulty algorithm, at <span class=\"nowrap\">block 21,000</span>, and the README of its source repository says every node and wallet must run v1.0.0 or later. The repository the Cake Wallet patch links to, Nightglass-Protocol1/monzero, showed as archived on GitHub on <span class=\"nowrap\">6 November 2026</span>. monzero.org points to Nightglass-Protocol1/Monzero-source instead, which holds the node, the command-line and desktop wallets, an Android wallet and an Android miner.",
      "## In Cake Wallet",
      "No released version of Cake Wallet supports Monzero, and on <span class=\"nowrap\">6 November 2026</span> a search of Cake Wallet's code on GitHub found no mention of it. Support exists as a patch, prepared as a pull request and described on this site: what it adds is in the <a href=\"/guides/monzero-in-cake-wallet/\" title=\"What the Monzero integration adds to Cake Wallet, and where it follows Monero instead of Wownero\">integration guide</a>, and where it stands in the <a href=\"/guides/monzero-cake-wallet-pull-request/\" title=\"The Monzero pull request to Cake Wallet: the six commits and the monero_c change it waits on\">pull request guide</a>.",
    ],
    faq: [
      {
        q: "Is Monzero the same as Monero?",
        a: "No. Monzero is built from the Monero codebase but runs a network of its own, with its own genesis block, ports and address prefixes, and its README says it is not affiliated with or endorsed by the Monero Project. Monzero addresses start with F.",
      },
      {
        q: "What does a Monzero address look like?",
        a: "A standard Monzero address or a subaddress starts with F and is 95 characters long; an integrated address is 106. The network prefixes are 86 for standard addresses, 87 for integrated addresses and 88 for subaddresses.",
      },
      {
        q: "How many decimal places does XMZ have?",
        a: "Eleven: one XMZ is 100,000,000,000 atomic units. Monzero's chain specification says eleven is the most its 100,000,000-coin primary emission allows in an unsigned 64-bit amount.",
      },
    ],
  },

  {
    slug: "monzero-nodes",
    createdAt: "2026-11-06T05:50:00+04:00",
    updatedAt: "2026-11-06T05:50:00+04:00",
    site: "zerocake",
    title: "Monzero nodes: node.monzero.org and the plain-HTTP RPC",
    cardTitle: "Monzero nodes and the plain-HTTP RPC",
    summary:
      "Cake Wallet's Monzero patch connects to one default node, node.monzero.org on port 6175, over plain HTTP. The ports, what that exposes, and the restore height.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Network", "Security"],
    action: {
      url: "https://monzero.org/explorer/",
      label: "Monzero explorer",
      title: "Monzero's block explorer on monzero.org, the one the patch links transactions to",
      icon: "search",
    },
    source: {
      name: "Monzero chain specification (GitHub); the Monzero patch series for Cake Wallet; our own queries of node.monzero.org",
      url: "https://github.com/Nightglass-Protocol1/monzero/blob/main/MONZERO_CHAIN_SPEC.md",
      verifiedOn: "2026-11-06",
    },
    body: [
      "The Monzero patch for Cake Wallet connects every Monzero wallet to one default node, <code>node.monzero.org</code> on <span class=\"nowrap\">port 6175</span>, over plain HTTP. A wallet for a Monero-family coin does not keep the whole blockchain on the phone or the computer: it asks a node — a machine that does — for blocks and hands it transactions to send on. Over plain HTTP, that conversation is unencrypted.",
      "## The ports",
      "Monzero's chain specification sets three: <strong><span class=\"nowrap\">6174</span></strong> for peer-to-peer traffic between nodes, <strong><span class=\"nowrap\">6175</span></strong> for the RPC that wallets connect to, and <strong><span class=\"nowrap\">6176</span></strong> for ZMQ. The project's README lists <code>node.monzero.org:6174</code> as its bootstrap node for other nodes and <code>node.monzero.org:6175</code> as its restricted public RPC.",
      "## The default node in the patch",
      "The patch's node list for Monzero has one entry: <code>node.monzero.org:6175</code>, marked as the default, with SSL off and auto-switching on. A settings migration, <span class=\"nowrap\">number 73</span>, adds that list and selects the node. Node addresses for Monzero are built as plain HTTP addresses, as Cake Wallet builds them for Wownero, and the screen for adding or editing a node handles Monzero the way it handles Monero and Wownero, login fields included.",
      "## What plain HTTP means",
      "Plain HTTP means every request the wallet makes and every answer the node gives cross the network unencrypted. Anyone on the path — the Wi-Fi, the internet provider, a proxy — can see that the device is talking to a Monzero node, can read what passes between them, including a transaction when it is sent, and could alter an answer on the way. The node itself sees the address the wallet connects from, encrypted or not.",
      "When we queried the node on <span class=\"nowrap\">6 November 2026</span>, port 6175 also answered over TLS, with a self-signed certificate. That would encrypt the line, but a certificate nobody vouches for does not prove who is at the other end, and the patch does not use it.",
      "## What we saw on the node",
      "Our own check, on <span class=\"nowrap\">6 November 2026</span>, over plain HTTP: the node answered <code>get_info</code> with status OK, on mainnet, synchronised and restricted, at a height of <span class=\"nowrap\">24,435 blocks</span> with a target of <span class=\"nowrap\">120 seconds</span> a block. The tests recorded in the pull request text were run earlier, at a height of 15,704.",
      "## Restore height from a date",
      "Restoring a wallet means scanning the chain for its coins, and a restore height says where to start. Cake Wallet can estimate one from a date. For Monzero there is no table of dates and heights yet, so the patch estimates it in a straight line from the chain's first block, dated <span class=\"nowrap\">25 August 2026</span>, at a deliberately slow <span class=\"nowrap\">400 seconds</span> a block rather than the <span class=\"nowrap\">120-second</span> target. The reasoning is in the code: guessing too low only makes the scan longer, while guessing too high would skip the blocks that hold the wallet's coins.",
      "Our own arithmetic from the node's answer bears that out. From the first block to the height we saw on <span class=\"nowrap\">6 November 2026</span>, the chain averaged about <span class=\"nowrap\">255 seconds</span> a block, so an estimate at 400 lands below the real height, as intended.",
      "## A new wallet's first height",
      "A newly created Monzero wallet reports a starting height of about <span class=\"nowrap\">14.9 million</span>, because the wallet library estimates it from Monero's constants. The chain is far shorter than that, so the wallet simply starts at the tip. The pull request text calls it harmless for new wallets; restores use the height or date the user gives, as for other coins.",
    ],
    faq: [
      {
        q: "What is the default Monzero node in Cake Wallet?",
        a: "In the Monzero patch it is node.monzero.org on port 6175, with SSL off. A settings migration, number 73, adds it and selects it as the default node for Monzero wallets.",
      },
      {
        q: "Which ports does Monzero use?",
        a: "6174 for peer-to-peer connections between nodes, 6175 for the RPC that wallets connect to, and 6176 for ZMQ, according to Monzero's chain specification.",
      },
      {
        q: "Is the connection to a Monzero node encrypted?",
        a: "Not as the Cake Wallet patch makes it: the default node is reached over plain HTTP, so the traffic between wallet and node can be read on the way. When we checked on 6 November 2026, port 6175 also answered over TLS, but with a self-signed certificate.",
      },
    ],
  },

  {
    slug: "monzero-cake-wallet-macos-build",
    createdAt: "2026-11-06T05:45:00+04:00",
    updatedAt: "2026-11-06T05:45:00+04:00",
    site: "zerocake",
    title: "Building Cake Wallet with Monzero on macOS: what was tested",
    cardTitle: "Building Cake Wallet with Monzero on macOS",
    summary:
      "Our build of Cake Wallet with the Monzero patch on an M1 Mac: a macOS Release app, Dart analysis, 13 passing tests, an in-app check, and what is not tested.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Cake Wallet"],
    source: {
      name: "Our own build and tests, as recorded in the Monzero pull request text and its build notes (MONZERO.md)",
      url: "https://github.com/cake-tech/cake_wallet",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Everything on this page is ours. We built and tested the Monzero patch on our own machine, an Apple Silicon Mac with an M1 chip running macOS 27, and the results below are the ones the pull request text records. None of the build is published here — not the app and not the libraries. This page describes it; it does not distribute it.",
      "## The native library",
      "Cake Wallet's Monero-family coins run on C libraries that monero_c builds from each coin's wallet code. For Monzero that library is <code>libmonzero_wallet2_api_c</code>. We built it from a local monero_c checkout that has the Monzero target, with Apple clang 21, Homebrew's Boost 1.92 and OpenSSL 3, and Trezor support switched off. Its wrapper exports <span class=\"nowrap\">354 symbols</span> with a <code>MONZERO_</code> prefix, and the checksums embedded in the library match the ones generated for the Dart side. On the M1, with other work running, the build took about an hour.",
      "A smoke test through the Dart bindings used a throwaway wallet: a <span class=\"nowrap\">95-character</span> address starting with F, a <span class=\"nowrap\">25-word</span> seed, a connection to node.monzero.org on <span class=\"nowrap\">port 6175</span>, a sync to the chain tip at <span class=\"nowrap\">height 15,704</span> within <span class=\"nowrap\">three seconds</span>, a balance of 0, and then the wallet closed and deleted.",
      "Because the library was linked against Homebrew's libraries, the app has to carry them: <span class=\"nowrap\">21 libraries</span>, <span class=\"nowrap\">28 MB</span>, rewritten to load from beside the Monzero library with nothing pointing back into Homebrew. Cake Wallet's own build makes monero_c's libraries with its static toolchain, where none of that is needed, and our notes for the pull request say the maintainers may prefer to drop the bundling step.",
      "## Dart analysis",
      "With Flutter 3.47.8 and Dart 3.13.7, after Cake Wallet's code generators had run, <code>dart analyze</code> found: <code>cw_monzero</code>, 0 errors and 12 warnings — the same 12 that <code>cw_wownero</code> has; <code>cw_core</code>, 0 errors; the generated Monzero glue, 0 errors and 0 warnings. Across the whole app there was no error or warning on any line the patch changes, none mentioning Monzero, and no switch statement left without a case for the new wallet type. The errors that remain on our machine belong to it: a secrets file that is not generated outside Cake Wallet's own builds, the Decred, Zano and Zcash glue that the macOS flags do not produce, and two places that trip over the newer Flutter.",
      "The analysis found two real bugs, both copied in from Wownero: opening a wallet always threw a deprecation error, and an untyped pointer in the seed restore failed three checks under strict casts. The second commit fixes both.",
      "## The tests",
      "<code>flutter test</code> in <code>cw_monzero</code> passes <strong><span class=\"nowrap\">13 tests</span></strong> on macOS arm64, against the Monzero library built from our monero_c fork. They are Cake Wallet's own BIP39 test and its vectors for Monero, run against Monzero, and <span class=\"nowrap\">nine new tests</span> of the wallet service, modelled on the Monero ones:",
      "Creating Legacy, Polyseed and BIP39 wallets. Restoring Cake Wallet's Monero test phrases, which must give Monero's test addresses with Monzero's prefix — computed separately, by decoding the address, changing prefix 18 to 86 and recomputing the Keccak checksum. Restoring the <span class=\"nowrap\">25-word</span> seed derived from a BIP39 phrase, which must give the same address. And BIP39 round trips — create, then restore — with <span class=\"nowrap\">12 words</span>, <span class=\"nowrap\">24 words</span> and a passphrase, which must give back the same phrase, address and restore height, with the passphrase changing the address.",
      "Three of the nine failed before the last fix, which the <a href=\"/guides/monzero-bip39-seeds/\" title=\"Monzero BIP39 seeds in Cake Wallet: the derivation, the shared keys and the bug the tests caught\">BIP39 guide</a> describes. Cake Wallet's CI builds only the Monero and Wownero libraries, so there the nine are skipped; we checked that they skip and that nothing fails.",
      "## Inside the app",
      "A macOS Release build, arm64, made with Xcode 27.1 and Flutter 3.47.8 and signed ad hoc under a separate development bundle id. In it we created a Monzero wallet and got a <span class=\"nowrap\">25-word</span> seed and the seed check; the wallet connected to node.monzero.org, synced and showed a balance of 0 XMZ; the Receive screen showed a valid F… subaddress, with network prefix 88 and a correct checksum. After a restart the wallet reopened and showed as synced straight after the PIN unlock — before the fifth commit it stayed at “Attempting sync”. The sandboxed app loaded the Monzero library and the libraries bundled with it.",
      "That build used tweaks that are not part of the pull request: Flutter 3.47 rather than the 3.41.9 that Cake Wallet's CI uses, two small fixes for the newer Flutter, and no Monero or Wownero libraries in the bundle.",
      "## What is not tested",
      "The pull request text lists it: builds for iOS, Android, Linux and Windows; a build with Cake Wallet's own CI toolchain, Flutter 3.41.9; the CI workflows, which the patch does not touch; sending and receiving XMZ; restoring from a seed or keys through the app's screens — the service tests restore from seeds, but not through the screens; wallet groups; and Ledger or Trezor, since Monzero has no hardware-wallet support.",
      "So far the patched app has shown that it can make a Monzero wallet, sync it and reopen it. Whether it moves coins will be known when someone sends XMZ from it and receives XMZ in it.",
    ],
    faq: [
      {
        q: "Has the Monzero Cake Wallet patch been tested on iOS or Android?",
        a: "Not in the testing the pull request records. That covers a macOS Release build on an Apple Silicon Mac, and lists builds for iOS, Android, Linux and Windows as not tested.",
      },
      {
        q: "Can the patched Cake Wallet send Monzero?",
        a: "Monzero is wired into the send, fee and unspent-coin screens, but sending and receiving were not tested: the in-app check created, synced and reopened a wallet with a balance of 0 XMZ.",
      },
      {
        q: "Which Flutter version was the Monzero build made with?",
        a: "Flutter 3.47.8 with Dart 3.13.7, and Xcode 27.1 on macOS 27. Cake Wallet's CI uses Flutter 3.41.9, and a build with that toolchain has not been done yet.",
      },
    ],
  },

  {
    slug: "monzero-cake-wallet-pull-request",
    createdAt: "2026-11-06T05:40:00+04:00",
    updatedAt: "2026-11-06T05:40:00+04:00",
    site: "zerocake",
    title: "The Monzero pull request to Cake Wallet, and monero_c",
    cardTitle: "The Monzero pull request to Cake Wallet",
    summary:
      "Monzero support for Cake Wallet is a six-commit pull request that rests on a separate monero_c change: the six commits, what has to land first, what is open.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Cake Wallet"],
    action: {
      url: "https://github.com/MrCyjaneK/monero_c",
      label: "monero_c on GitHub",
      title: "monero_c, the wallet library Cake Wallet builds its Monero-family coins from",
      icon: "code",
    },
    source: {
      name: "The Monzero pull request text and our notes for it; GitHub searches of cake-tech/cake_wallet and MrCyjaneK/monero_c",
      url: "https://github.com/MrCyjaneK/monero_c",
      verifiedOn: "2026-11-06",
    },
    body: [
      "## Where it stands",
      "As of <span class=\"nowrap\">6 November 2026</span> the pull request is prepared and has <strong>not been submitted</strong>: nothing has been pushed to GitHub and no fork has been made. Searches on GitHub that day found no issue, pull request or code in cake-tech/cake_wallet that mentions Monzero, and no issue or pull request about it in monero_c. This page describes the change as it is meant to be sent.",
      "## The title and the base",
      "The pull request is titled <code>monzero: add Monzero (XMZ) wallet support</code>. It is built on Cake Wallet commit 1772b7624, “Strip EVM chain id from QR scanned into swap receive address”, pull request 3756, merged on <span class=\"nowrap\">24 October 2026</span>. The six patches have been checked to apply cleanly there and to reproduce the branch exactly.",
      "## The six commits",
      "<strong>1. Add Monzero (XMZ) wallet support.</strong> The integration itself: <span class=\"nowrap\">134 files</span> and about 23,200 lines, most of them the new <code>cw_monzero</code> package and its word lists. The <a href=\"/guides/monzero-in-cake-wallet/\" title=\"What the Monzero integration adds to Cake Wallet, and where it follows Monero instead of Wownero\">integration guide</a> has what it adds.",
      "<strong>2. Open wallets normally instead of Wownero's deprecation path.</strong> The copied Wownero code threw a deprecation error on every open; Monzero now retries the way Monero does, a bounded number of times.",
      "<strong>3. Drop duplicate and unused imports from the generated proxy.</strong> The generated Monzero glue now analyses with no warnings.",
      "<strong>4. Record Dart analysis results and local build notes.</strong> A notes file, MONZERO.md, from the build machine. The pull request text offers to drop or trim it.",
      "<strong>5. Report the end of sync the way the Monero code does.</strong> A reopened wallet no longer stays at “Attempting sync”.",
      "<strong>6. Support BIP39 seeds the way the Monero code does.</strong> BIP39 create and restore on Monero's path, with nine new tests of the wallet service; the <a href=\"/guides/monzero-bip39-seeds/\" title=\"Why one BIP39 phrase gives the same keys on Monero and Monzero, and what to do about it\">BIP39 guide</a> has what that means.",
      "Our notes also list <span class=\"nowrap\">eleven local</span> commits on top of these six — the Flutter 3.47 fixes, a development bundle id, an iOS Xcode project, notes on an iOS device build and a rebuild on Monzero v1.0.0 among them. They stay on the build machine and are not part of the pull request.",
      "## What has to land first: monero_c",
      "Cake Wallet does not build each coin's wallet code itself. It uses monero_c, which builds Monero's wallet library for each Monero-family coin as a C library with Dart bindings, and it pins monero_c to one commit through <code>scripts/prepare_moneroc.sh</code>. The commit it pins has no Monzero in it.",
      "The change that adds Monzero to monero_c — a C wrapper with the <code>MONZERO_</code> prefix, Monero's series of <span class=\"nowrap\">21 patches</span> rebased onto Monzero, and the Dart API <code>lib/monzero.dart</code> — is prepared as a separate pull request to monero_c, and has not been submitted either. It has to be merged, or at least open, before this one makes sense. Then two pins in Cake Wallet move to the monero_c commit that has it: the <code>monero</code> override in <code>pubspec_overrides.yaml</code> and <code>MONERO_C_REF</code> in the prepare script. Until they do, <code>cw_monzero</code> cannot find its library.",
      "## What else is open before sending",
      "Our notes for the pull request list three things to settle first.",
      "<strong>The icons.</strong> Placeholders, to be replaced with the official Monzero logo.",
      "<strong>The build notes.</strong> MONZERO.md is written for our build machine, with its local paths; it is to be dropped or cut down to what matters upstream.",
      "<strong>The bundling step.</strong> The script and the Xcode build phase that carry Homebrew's libraries into the macOS app exist only because our library was linked against them. Cake Wallet builds monero_c statically, so the maintainers may prefer to drop both; the pull request should say so, or remove them first.",
      "Two more turned up when we checked the public pages on <span class=\"nowrap\">6 November 2026</span>.",
      "<strong>The upstream link.</strong> The pull request text links Monzero's repository as Nightglass-Protocol1/monzero, which GitHub showed as archived that day; monzero.org now points to Nightglass-Protocol1/Monzero-source.",
      "<strong>The Monzero version.</strong> Monzero's v1.0.0 moved its network to hard fork 17 at <span class=\"nowrap\">block 21,000</span>, and the README of its source repository says every node and wallet must run v1.0.0 or later. The tests in the pull request text ran at <span class=\"nowrap\">height 15,704</span>, before that block.",
      "## What Cake Wallet's maintainers will decide",
      "Whether Cake Wallet adds a coin is a product decision, not a question of whether the code works: Cake Wallet adds coins selectively. The pull request is written as a proposal, and our notes expect questions about the coin, its node infrastructure and who maintains the integration. Today the patch ships a single default node, node.monzero.org; the <a href=\"/guides/monzero-nodes/\" title=\"Monzero nodes: the ports, the default node and what plain-HTTP RPC exposes\">nodes guide</a> has what that connection is.",
    ],
    faq: [
      {
        q: "Has the Monzero pull request been submitted to Cake Wallet?",
        a: "Not as of 6 November 2026. The six commits are prepared and checked to apply cleanly on Cake Wallet commit 1772b7624, but nothing has been pushed or forked, and GitHub showed no Monzero issue or pull request in cake-tech/cake_wallet that day.",
      },
      {
        q: "What is monero_c, and why does the Monzero integration need it?",
        a: "monero_c is the project Cake Wallet uses to build Monero's wallet code for each Monero-family coin as a C library with Dart bindings. The commit Cake Wallet pins has no Monzero target, so a separate monero_c change, prepared as its own pull request, has to land first.",
      },
      {
        q: "Will Cake Wallet add Monzero?",
        a: "That is Cake Wallet's decision to make. It adds coins selectively, and the pull request is written as a proposal; the maintainers can be expected to ask about the coin, its nodes and who maintains the integration.",
      },
    ],
  },
];
