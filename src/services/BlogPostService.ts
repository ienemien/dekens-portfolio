import type BlogPost from "@/model/BlogPost";
import type BlogPostResponse from "@/model/BlogPostResponse";

export default class BlogPostService {
  private static POSTS_URL = "/api/posts";
  private static DEFAULT_POSTS_PER_PAGE = 10;

  public async fetchPosts(
    page: number,
    perPage?: number
  ): Promise<BlogPostResponse | undefined> {
    const blogPostResponse: BlogPostResponse = {
      totalPages: 0,
      totalPosts: 0,
      posts: [],
    };
    const postsPerPage = perPage ?? BlogPostService.DEFAULT_POSTS_PER_PAGE;
    const response: Response = await fetch(
      `${BlogPostService.POSTS_URL}?page=${page}&per_page=${postsPerPage}`
    );

    if (response.status === 200) {
      blogPostResponse.posts = await response.json();
      blogPostResponse.totalPages = parseInt(
        response.headers.get("x-wp-totalpages") ?? "0"
      );
      blogPostResponse.totalPosts = parseInt(
        response.headers.get("x-wp-total") ?? "0"
      );
      return blogPostResponse;
    } else {
      throw "Could not fetch posts.";
    }
  }

  public async fetchPost(postId: string): Promise<BlogPost> {
    const URL = `${BlogPostService.POSTS_URL}/${postId}`;
    const response = await fetch(URL);

    if (response.status === 200) {
      return response.json();
    }

    throw "Could not fetch post by id: " + postId;
  }
}
