import type MediaDetails from "./MediaDetails";

interface WordpressText {
  rendered: string;
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
