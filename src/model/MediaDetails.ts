interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export default interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    medium: MediaSize;
    large: MediaSize;
    thumbnail: MediaSize;
    "project-archive": MediaSize;
    "project-single": MediaSize;
    "project-thumbnail": MediaSize;
    full: MediaSize;
  };
  image_meta: unknown;
}
