export default interface  WordpressLink {
    href: string;
    embeddable?: boolean;
    count?: number;
    id?: number;
    taxonomy?: string;
    name?: string;
    templated?: boolean;
  }