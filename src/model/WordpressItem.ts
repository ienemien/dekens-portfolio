interface link {
  href: string;
  embeddable?: boolean;
  count?: number;
  id?: number;
  taxonomy?: string;
  name?: string;
  templated?: boolean;
}

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
  _links: {
    self: link[];
    collection: link[];
    about: link[];
    author: link[];
    replies: link[];
    versionHistory: link[];
    predecessorVersion: link[];
    "wp:attachment": link[];
    wpTerm: link[];
    curies: link[];
    "wp:featuredmedia": link[];
    "wp:term": link[];
  };
}
