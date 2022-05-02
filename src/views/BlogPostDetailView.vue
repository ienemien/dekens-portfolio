<script setup lang="ts">
import type Post from "@/model/BlogPost";
import BlogPostService from "@/services/BlogPostService";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const postService = new BlogPostService();
const post = ref<Post>();
const route = useRoute();
let postDate = ref("");

onMounted(async () => {
  try {
    const routeParamId = route.params["id"];
    post.value = await postService.fetchPost(
      Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
    );
    postDate.value = dayjs(post?.value?.date).format("DD MMMM YYYY");
  } catch (err) {
    alert(err); // TODO: proper error handling
  }
});
</script>

<template>
  <main>
    <h2 v-html="post?.title.rendered"></h2>
    <h3>{{ postDate }}</h3>
    <p v-html="post?.content.rendered"></p>
    <RouterLink to="/blog">Terug</RouterLink>
  </main>
</template>

<style></style>
