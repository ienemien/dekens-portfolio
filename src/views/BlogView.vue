<script setup lang="ts">
import BlogPostSummary from "@/components/BlogPostSummary.vue";
import { useBlogPostStore } from "@/stores/BlogPostStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppPagination from "../components/AppPagination.vue";

const route = useRoute();
const blogPostStore = useBlogPostStore();
const activePage = ref(1);

watch(
  () => route.query.page,
  (newPageNr) => {
    if (newPageNr) {
      activePage.value = parseInt(newPageNr as string);
      blogPostStore.fetchPosts(activePage.value);
    }
  }
);

onMounted(async () => {
  activePage.value = route.query.page
    ? parseInt(route.query.page as string)
    : 1;
  blogPostStore.fetchPosts(activePage.value);
});
</script>

<template>
  <h1>Blog</h1>
  <ul class="blogpost-list">
    <li
      class="blogpost-item"
      v-for="post in blogPostStore.activePosts"
      :key="post.id"
    >
      <BlogPostSummary :post="post" />
    </li>
  </ul>
  <AppPagination
    :active-page="activePage"
    :page-count="blogPostStore.totalPages"
  >
  </AppPagination>
</template>

<style scoped>
.blogpost-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
}

.blogpost-item {
  list-style: none;
  border-radius: 5px;
  border: 1pt solid lightgray;
  box-shadow: 5px 5px 8px 5px rgb(235, 235, 235);
  padding: 15px;
}

@media screen and (min-width: 740px) {
  .blogpost-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
