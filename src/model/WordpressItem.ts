import type WordpressLinks from "./WordpressLinks";

export default interface WordpressItem {
  id: number;
  date: string;
  dateGmt: string;
  guid: {
    rendered: string;
  };
  modified: Date;
  modifiedGmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featuredMedia: number;
  commentStatus: string;
  pingStatus: string;
  sticky: boolean; // niet in page
  template: string;
  format: string;
  meta: {
    spayEmail: string;
  };
  categories: number[];
  tags: string[];
  jetpackFeaturedMediaUrl: string;
  _links: WordpressLinks;
}
