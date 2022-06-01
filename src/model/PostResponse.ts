import type BlogPost from "./BlogPost";
import type Project from "./Project";

export default interface PostResponse {
  posts: BlogPost[] | Project[];
  totalPages: number;
  total: number;
}
