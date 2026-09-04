// BroadwayWorld message board, without driving the UI.
//
// The board has no API and its login cookie is httpOnly, so a node script
// cannot post: the request has to leave the browser that is signed in. These
// helpers do that — paste this file into the Browser pane's javascript tool
// (mcp__Claude_Browser__javascript_tool) on any forum.broadwayworld.com page,
// then call one function. No clicking, no screenshots, no scroll_to.
//
// Two things learned the hard way, both encoded below:
//   - the quick-reply box strips <a> and does not linkify a bare URL. Only
//     the full editor's endpoints keep a link, and it renders rel="ugc".
//   - editmessage.php is backed by CKEditor; writing the raw textarea is
//     sanitised on save. These helpers post the form directly and avoid it.
//
// Body is HTML: paragraphs separated by <br /><br />, links as plain <a href>.
(() => {
  const F = (o) => { const b = new URLSearchParams(); for (const [k, v] of Object.entries(o)) if (v !== undefined) b.append(k, v); return b; };
  const post = async (url, body) => {
    const r = await fetch(url, { method: "POST", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: F(body) });
    return { status: r.status, url: r.url };
  };

  window.BWW = {
    /** Reply in a thread. threadId is the numeric mid, replyTo the message
        being answered (any message in the thread works). */
    reply: (threadId, replyTo, html, watch = true) =>
      post(`https://forum.broadwayworld.com/postmessage2.php?boardtype=new&boardid=0&MID=${threadId}&M=${replyTo}`,
        { Subject: "Re:", Subject_required: "You must enter a Subject", HTMLPreviewTextArea: html, alert_frequency: "instant", auto_watch: watch ? "on" : undefined }),

    /** Start a thread. topicid picks the sub-board: 1477 General Broadway,
        1480 General - WEST END, 1476 Tickets & Box Office, 3959 Show - CHICAGO. */
    newThread: (topicid, subject, html) =>
      post("https://forum.broadwayworld.com/postmessage.php?boardtype=new&boardid=1",
        { topicid, Subject: subject, Subject_required: "You must enter a Subject", HTMLPreviewTextArea: html, alert_frequency: "instant" }),

    /** Rewrite one of our own messages — the only way to add a real link to
        something posted through quick reply. */
    edit: (messageId, threadId, html) =>
      post(`https://forum.broadwayworld.com/editmessage2.php?M=${messageId}&MID=${threadId}&boardtype=new&boardid=0`,
        { ID: messageId, ThreadID: threadId, Subject: "Re:", Subject_required: "You must enter a Subject", HTMLPreviewTextArea: html, alert_frequency: "instant" }),

    /** Read a thread back: post numbers, authors, and every external link
        with its rel — the check that a link actually survived. */
    read: async (slug, page = "") => {
      const t = await (await fetch(`https://forum.broadwayworld.com/thread/${slug}${page ? "/" + page : ""}`)).text();
      const d = new DOMParser().parseFromString(t, "text/html");
      return [...d.querySelectorAll("[class*=board-thread-post]")].filter((p) => p.querySelector(".board-thread-post__num")).map((p) => ({
        num: p.querySelector(".board-thread-post__num")?.textContent.trim(),
        who: p.querySelector(".username")?.textContent.trim(),
        text: p.querySelector(".board-thread-post__body")?.innerText.replace(/\s+/g, " ").slice(0, 200),
        links: [...p.querySelectorAll('a[href^="http"]')].filter((a) => !/broadwayworld\.com/.test(a.href)).map((a) => `${a.getAttribute("href")} [${a.getAttribute("rel")}]`),
      }));
    },
  };
  return Object.keys(window.BWW);
})();
