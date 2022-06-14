import type Alert from "@/model/Alert";
import type BlogPost from "@/model/BlogPost";
import type PostResponse from "@/model/PostResponse";
import { useAlertStore } from "@/stores/AlertStore";
import axios, { type AxiosResponse } from "axios";

export default class BlogPostService {
  private static POSTS_URL = "/api/posts";
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
        { timeout: 3000 }
      );
      blogPostResponse.posts = response.data;
      blogPostResponse.totalPages = parseInt(
        response.headers["x-wp-totalpages"] ?? "0"
      );
      blogPostResponse.total = parseInt(response.headers["x-wp-total"] ?? "0");
      return blogPostResponse;
    } catch (err) {
      const alert = {
        type: "error",
        message: `Could not fetch posts for page ${page}`,
      } as Alert;
      this.alertStore.addAlert(alert);
    }
  }

  public async fetchPost(postId: string): Promise<BlogPost | undefined> {
    const URL = `${BlogPostService.POSTS_URL}/${postId}`;
    const response = await fetch(URL);

    if (response.status === 200) {
      return response.json();
    }

    const alert = {
      type: "error",
      message: `Could not fetch post by id ${postId}`,
    } as Alert;
    this.alertStore.addAlert(alert);

    return;
  }
}
