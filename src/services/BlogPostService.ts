import type BlogPost from "@/model/BlogPost";
import type PostResponse from "@/model/PostResponse";
import { useAlertStore } from "@/stores/AlertStore";
import axios, { type AxiosResponse } from "axios";

export default class BlogPostService {
  private static AXIOS_CONFIG = { timeout: 3000 };
  private static POSTS_URL =
    "https://www.jojannekedekens.nl/wp-json/wp/v2/posts";
  private static DEFAULT_POSTS_PER_PAGE = 10;
  private alertStore = useAlertStore();

  public async fetchPosts(
    page: number,
    perPage?: number
  ): Promise<PostResponse | undefined> {
    const blogPostResponse: PostResponse = {
      totalPages: 0,
      total: 0,
      posts: [],
    };
    const postsPerPage = perPage ?? BlogPostService.DEFAULT_POSTS_PER_PAGE;

    try {
      const response: AxiosResponse = await axios.get(
        `${BlogPostService.POSTS_URL}?page=${page}&per_page=${postsPerPage}`,
        BlogPostService.AXIOS_CONFIG
      );
      blogPostResponse.posts = response.data;
      blogPostResponse.totalPages = parseInt(
        response.headers["x-wp-totalpages"] ?? "0"
      );
      blogPostResponse.total = parseInt(response.headers["x-wp-total"] ?? "0");
      return blogPostResponse;
    } catch (err) {
      this.alertStore.addAlert(
        "Helaas lukt het op dit moment niet om de berichten op te halen, probeer het later nog eens."
      );
    }
  }

  public async fetchPost(postId: string): Promise<BlogPost | undefined> {
    const URL = `${BlogPostService.POSTS_URL}/${postId}`;

    try {
      const response: AxiosResponse = await axios.get(
        URL,
        BlogPostService.AXIOS_CONFIG
      );
      return response.data;
    } catch (err) {
      this.alertStore.addAlert(
        "Helaas lukt het op dit moment niet om het bericht op te halen, probeer het later nog eens."
      );
    }
  }
}
