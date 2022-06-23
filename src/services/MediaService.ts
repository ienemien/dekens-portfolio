import type BlogPost from "@/model/BlogPost";
import { useAlertStore } from "@/stores/AlertStore";
import axios from "axios";

export default class MediaService {
  private static AXIOS_CONFIG = { timeout: 3000 };
  private alertStore = useAlertStore();

  public async getThumbnail(
    item: BlogPost | undefined
  ): Promise<string | undefined> {
    try {
      const mediaUrl = item?._links["wp:attachment"]?.[0].href;
      if (mediaUrl) {
        const media = await (
          await axios.get(mediaUrl, MediaService.AXIOS_CONFIG)
        ).data;
        return media[0].media_details.sizes["project-thumbnail"]?.source_url;
      }
    } catch (err) {
      // no picture, no problem
    }
  }
}
