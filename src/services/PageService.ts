import type Page from "@/model/Page";
import { useAlertStore } from "@/stores/AlertStore";
import axios from "axios";

export default class PageService {
  private static AXIOS_CONFIG = { timeout: 5000 };
  private alertStore = useAlertStore();
  private static PAGES_URL =
    "https://www.jojannekedekens.nl/?rest_route=/wp/v2/pages";

  public async fetchPageBySlug(slug: string): Promise<Page | undefined> {
    const URL = `${PageService.PAGES_URL}&slug=${slug}`;

    try {
      const response = await axios.get(URL, PageService.AXIOS_CONFIG);
      const pages: Page[] = response.data;
      return pages[0];
    } catch (err) {
      this.alertStore.addAlert(
        "De pagina kon op dit moment helaas niet worden opgehaald, probeer het later nog eens"
      );
    }
  }
}
