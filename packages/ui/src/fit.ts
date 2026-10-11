// How a news item's picture meets a card's cover box (FeedCards' imageFit).
// A photograph fills its cover; a diagram is fitted whole. Unmarked images
// are fitted too — that is the safe way round, since a cropped chart loses
// the numbers while a fitted photo only sits in a slightly smaller box.
// One rule for every place a news card is drawn: when the article tails
// were left out of it, a painting that filled its card in the listing sat
// between two dark bars under the article.
export const fitFor = (kind?: string): "cover" | "contain" =>
  kind === "photo" || kind === "render" || kind === "generated" ? "cover" : "contain";
