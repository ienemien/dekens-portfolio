<script setup lang="ts">
import type Post from "@/model/BlogPost";
import BlogPostService from "@/services/BlogPostService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const postService = new BlogPostService();
const post = ref<Post>();
const route = useRoute();
const postDate = computed(() =>
  dayjs(post?.value?.date).format("DD MMMM YYYY")
);
const postDateTime = computed(() =>
  dayjs(post?.value?.date).format("YYYY-MM-DD")
);

onMounted(async () => {
  try {
    const routeParamId = route.params["id"];
    post.value = await postService.fetchPost(
      Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
    );
  } catch (err) {
    alert(err); // TODO: proper error handling
  }
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="post?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="post?.content.rendered"></p>
    <RouterLink to="/blog">Terug</RouterLink>
  </article>
</template>

<style scoped></style>
