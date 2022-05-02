<script setup lang="ts">
import type Post from "@/model/BlogPost";
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

const post = ref<Post>();
const route = useRoute();
const URL = `/api/posts/${route.params["id"]}`;
let postDate = ref('');

onMounted(async () => {
  post.value = await (await fetch(URL)).json();
  postDate.value = dayjs(post?.value?.date).format('DD MMMM YYYY');
});
</script>

<template>
  <main>
    <h2 v-html="post?.title.rendered"></h2>
    <h3> {{ postDate }}</h3>
    <p v-html="post?.content.rendered"></p>
    <RouterLink to="/blog">Terug</RouterLink>
  </main>
</template>

<style>
</style>
