<script setup lang="ts">
import type Post from "@/model/Post";
import PostSummary from "@/components/PostSummary.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const POSTS_PER_PAGE = 10;
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

async function fetchPosts(
  pageNr: string
): Promise<void> {
  const POSTS_URL = `/api/posts?page=${pageNr ?? 1}&per_page=${POSTS_PER_PAGE}`;
  const response = await fetch(POSTS_URL);

  if (response.status === 200) {
    posts.value = await response.json();
    totalPages.value = parseInt(response.headers.get("x-wp-totalpages") ?? "1");
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
