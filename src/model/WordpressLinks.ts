import type WordpressLink from "./WordpressLink";

export default interface WordpressLinks {
  self: WordpressLink[];
  collection: WordpressLink[];
  about: WordpressLink[];
  author: WordpressLink[];
  replies: WordpressLink[];
  versionHistory: WordpressLink[];
  predecessorVersion: WordpressLink[];
  "wp:attachment": WordpressLink[];
  wpTerm: WordpressLink[];
  curies: WordpressLink[];
  "wp:featuredmedia": WordpressLink[];
  "wp:term": WordpressLink[];
}
