<script setup lang="ts">
import BlogPostSummary from "@/components/BlogPostSummary.vue";
import { useBlogPostStore } from "@/stores/BlogPostStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppLoader from "../components/AppLoader.vue";
import AppPagination from "../components/AppPagination.vue";

const route = useRoute();
const blogPostStore = useBlogPostStore();
const activePage = ref(1);

watch(
  () => route.query.page,
  async (newPageNr) => {
    activePage.value = parseInt((newPageNr ?? 1) as string);
    await blogPostStore.fetchPosts(activePage.value);
  }
);

onMounted(async () => {
  activePage.value = route.query.page
    ? parseInt(route.query.page as string)
    : 1;
  await blogPostStore.fetchPosts(activePage.value);
});
</script>

<template>
  <AppLoader v-if="blogPostStore.loading"></AppLoader>
  <TransitionGroup name="list" tag="div" class="blogpost-list">
    <BlogPostSummary
      :post="post"
      v-for="post in blogPostStore.activePosts"
      :key="post.id"
    />
  </TransitionGroup>
  <AppPagination
    :route-name="'blog'"
    :active-page="activePage"
    :page-count="blogPostStore.totalPages"
  >
  </AppPagination>
</template>

<style scoped lang="scss">
@import "../assets/css/_load-posts.scss";
.blogpost-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2vh;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  .blogpost-item {
    list-style: none;
  }
}
</style>
