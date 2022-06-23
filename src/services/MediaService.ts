import type BlogPost from "@/model/BlogPost";
import type Page from "@/model/Page";
import type Project from "@/model/Project";
import axios from "axios";

export default class MediaService {
  private static AXIOS_CONFIG = { timeout: 3000 };

  public async getThumbnail(
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

  public async getProjectArchive(
    item: Project | undefined
  ): Promise<string | undefined> {
    const mediaUrl = item?._links["wp:attachment"]?.[0].href;
    if (mediaUrl) {
      const media = await (
        await axios.get(mediaUrl, MediaService.AXIOS_CONFIG)
      ).data;
      return media[0]?.media_details.sizes["project-archive"]?.source_url;
    }
  }

  public async getFeaturedMedia(
    item: Page | undefined
  ): Promise<string | undefined> {
    const mediaUrl = item?._links["wp:featuredmedia"]?.[0].href;
    if (mediaUrl) {
      const media = (await axios.get(mediaUrl)).data;
      return media?.source_url;
    }
  }
}
