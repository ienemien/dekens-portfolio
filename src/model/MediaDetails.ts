interface MediaSizeDetails {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export type MediaSize =
  | "medium"
  | "large"
  | "thumbnail"
  | "full"
  | "project-archive"
  | "project-single"
  | "project-thumbnail";

export default interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<MediaSize, MediaSizeDetails>;
  image_meta: unknown;
}
