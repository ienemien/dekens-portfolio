import type BlogPost from "@/model/BlogPost";
import BlogPostService from "@/services/BlogPostService";
import { defineStore } from "pinia";

export const useBlogPostStore = defineStore({
  id: "blogpost",
  state: () => ({
    pages: [{ pageNr: 0, posts: [] as BlogPost[] }],
    totalPages: 0,
    currentPage: 0,
  }),
  getters: {
    activePosts: (state) =>
      state.pages.find((page) => page.pageNr === state.currentPage)?.posts ??
      [],
  },
  actions: {
    async fetchPosts(pageNr: number): Promise<void> {
      this.currentPage = pageNr;

      if (this.activePosts) {
        return;
      } else {
        const postService = new BlogPostService();
        const response = await postService.fetchPosts(pageNr);
        this.pages.push({ pageNr, posts: response?.posts ?? [] });
        this.totalPages = response?.totalPages ?? 0;
      }
    },
  },
});
