import type BlogPost from "./BlogPost";

export default interface BlogPostResponse {
  posts: BlogPost[];
  totalPages: number;
  totalPosts: number;
}
