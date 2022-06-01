import type BlogPost from "./BlogPost";

export default interface Project extends BlogPost {
  "project-categories": number[];
}
