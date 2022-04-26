interface link {
  href: string;
  embeddable?: boolean;
  count?: number;
  id?: number;
  taxonomy?: string;
  name?: string;
  templated?: boolean;
}

export default interface Post {
  id: number;
  date: Date;
  dateGmt: Date;
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
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    spayEmail: string;
  };
  categories: number[];
  tags: string[];
  jetpackFeaturedMediaUrl: string;
  links: {
    self: link[];
    collection: link[];
    about: link[];
    author: link[];
    replies: link[];
    versionHistory: link[];
    predecessorVersion: link[];
    wpAttachment: link[];
    wpTerm: link[];
    curies: link[];
  };
}
