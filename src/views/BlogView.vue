<script setup lang="ts">
import PostSummary from "@/components/BlogPostSummary.vue";
import { useBlogPostStore } from "@/stores/BlogPostStore";
import { onMounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const blogPostStore = useBlogPostStore();

watch(
  () => route.query.page,
  async (newPageNr) => {
    if (newPageNr) {
      await blogPostStore.fetchPosts(parseInt(newPageNr as string));
    }
  }
);

onMounted(async () => {
  blogPostStore.fetchPosts(parseInt((route.query.page as string) ?? 1));
});
</script>

<template>
  <h1>Blog</h1>
  <PostSummary
    v-for="post in blogPostStore.activePosts"
    :key="post.id"
    :post="post"
  />
  <nav>
    <ul>
      <li v-for="i in blogPostStore.totalPages" v-bind:key="i">
        <RouterLink :to="{ name: 'blog', query: { page: i } }">{{
          i
        }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>
