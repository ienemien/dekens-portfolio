import type BlogPost from "@/model/BlogPost";
import type Media from "@/model/Media";
import type { MediaSize } from "@/model/MediaDetails";
import type Page from "@/model/Page";
import type Project from "@/model/Project";
import axios from "axios";

export default class MediaService {
  private static AXIOS_CONFIG = { timeout: 10000 };

  public async getMedia(
    item: BlogPost | Project | undefined
  ): Promise<Media[]> {
    let media = [] as Media[];
    const mediaUrl = item?._links["wp:attachment"]?.[0].href + "&per_page=100";
    const featuredUrl = item?._links["wp:featuredmedia"]?.[0].href;
    if (mediaUrl && featuredUrl) {
      const response = await axios.get(mediaUrl);
      const attachments = response.data;
      const featured = (await axios.get(featuredUrl)).data as Media;
      media.push(featured);
      media = media.concat(attachments);

      // the media api can only return max. 100 media items per page, so if there's more get these too
      const totalPages = parseInt(response.headers["x-wp-totalpages"] ?? "0");
      if (totalPages > 1) {
        for (let i = 2; i <= totalPages; i++) {
          const moreMedia = (await axios.get(mediaUrl + "&page=" + i))
            .data as Media[];
          media = media.concat(moreMedia);
        }
      }
    }
    return media;
  }

  public async getProjectThumbnailUrl(
    item: BlogPost | undefined
  ): Promise<string | undefined> {
    const mediaUrl = item?._links["wp:attachment"]?.[0].href;
    if (mediaUrl) {
      const media = await (
        await axios.get(mediaUrl, MediaService.AXIOS_CONFIG)
      ).data;
      return media[0]?.media_details.sizes["project-thumbnail"]?.source_url;
    }
  }

  public async getFeaturedMediaUrl(
    item: Page | Project | BlogPost | undefined,
    size?: MediaSize
  ): Promise<string | undefined> {
    const mediaUrl = item?._links["wp:featuredmedia"]?.[0].href;
    if (mediaUrl) {
      const media = (await axios.get<Media>(mediaUrl)).data;
      return (
        media.media_details.sizes[size ?? "large"]?.source_url ??
        media.source_url
      );
    }
  }
}
