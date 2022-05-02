<script setup lang="ts">
import type Post from "@/model/BlogPost";
import PostSummary from "@/components/BlogPostSummary.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import type BlogPostResponse from "@/model/BlogPostResponse";
import BlogPostService from "@/services/BlogPostService";

const route = useRoute();
const blogPostService = new BlogPostService();
const posts = ref<Post[]>([]);
const totalPages = ref(1);

watch(
  () => route.query.page,
  async (newPageNr) => {
    await fetchPosts(newPageNr as string);
  }
);

onMounted(async () => {
  fetchPosts(route.query.page as string);
});

async function fetchPosts(pageNr: string): Promise<void> {
  try {
    const response: BlogPostResponse | undefined =
      await blogPostService.fetchPosts(parseInt(pageNr ?? "1"));
    posts.value = response?.posts ?? [];
    totalPages.value = response?.totalPages ?? 0;
  } catch (err) {
    alert(err); // TODO: better error handling
  }
}
</script>

<template>
  <main>
    <h1>Blog</h1>
    <PostSummary v-for="post in posts" :key="post.id" :post="post" />
    <ul>
      <li v-for="i in totalPages" v-bind:key="i">
        <RouterLink :to="{ name: 'blog', query: { page: i } }">{{
          i
        }}</RouterLink>
      </li>
    </ul>
  </main>
</template>
