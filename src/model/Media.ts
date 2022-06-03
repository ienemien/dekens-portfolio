interface WordpressText {
  rendered: string;
}

interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    medium: MediaSize;
    thumbnail: MediaSize;
    "project-archive": MediaSize;
    "project-single": MediaSize;
    "project-thumbnail": MediaSize;
    full: MediaSize;
  };
  image_meta: unknown;
}

export default interface Media {
  date?: string;
  date_gmt?: string;
  guid: WordpressText;
  id: number;
  link: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  type: string;
  permalink_template: string;
  generated_slug: string;
  title: WordpressText;
  author: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  meta: { spay_email: string };
  template: string;
  alt_text: string;
  caption: WordpressText;
  description: WordpressText;
  media_type: "image" | "file";
  mime_type: string;
  media_details: MediaDetails;
  post: number;
  source_url: string;
  missing_image_sizes?: unknown;
}
