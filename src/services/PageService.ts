import type Page from "@/model/Page";

export default class PageService {
  private static PAGES_URL = "/api/pages";

  public async fetchPageBySlug(slug: string): Promise<Page[]> {
    const URL = `${PageService.PAGES_URL}?slug=${slug}`;
    const response = await fetch(URL);

    if (response.status === 200) {
      return (await response.json()) as Page[];
    }

    throw "Could not fetch page by slug: " + slug;
  }
}
