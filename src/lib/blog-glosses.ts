/**
 * Editorial glosses in Spanish-course blog articles use [[español|English]].
 * Blog markdown is rendered with react-markdown (no TranslatedText), so we
 * expand the markers before parse. Do this *before* GFM tables, because a
 * raw `|` inside a gloss would split a table cell.
 */
const GLOSS_RE = /\[\[([^[\]]+?)\|([^[\]]+?)\]\]/g;

export function expandBlogGlosses(text: string): string {
  if (!text || !text.includes("[[")) return text;
  return text.replace(GLOSS_RE, "**$1** — *$2*");
}
