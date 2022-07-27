<script setup lang="ts">
import BlogPostSummary from "@/components/BlogPostSummary.vue";
import { useBlogPostStore } from "@/stores/BlogPostStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppPagination from "../components/AppPagination.vue";
import AppLoader from "../components/AppLoader.vue";

const route = useRoute();
const blogPostStore = useBlogPostStore();
const activePage = ref(1);

watch(
  () => route.query.page,
  async (newPageNr) => {
    if (newPageNr) {
      activePage.value = parseInt(newPageNr as string);
      await blogPostStore.fetchPosts(activePage.value);
    }
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
  <TransitionGroup name="list" tag="ul" class="blogpost-list">
    <li
      class="blogpost-item"
      v-for="post in blogPostStore.activePosts"
      :key="post.id"
    >
      <BlogPostSummary :post="post" />
    </li>
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
  grid-gap: 40px;

  @media screen and (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
  }

  .blogpost-item {
    list-style: none;
    border-radius: 5px;
    border: 1pt solid lightgray;
    box-shadow: 5px 5px 8px 5px rgb(235, 235, 235);
    padding: 15px;
  }
}
</style>
