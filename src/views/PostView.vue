<script setup lang="ts">
import type Post from "@/model/Post";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const post = ref<Post>();
const route = useRoute();
const URL = `/api/posts/${route.params["id"]}`;

onMounted(async () => {
  post.value = await (await fetch(URL)).json();
});
</script>

<template>
  <main>
    <h2 v-html="post?.title.rendered"></h2>
    <h3> {{ post?.date }}</h3>
    <p v-html="post?.content.rendered"></p>
    <RouterLink :to="{name: 'home'}">Terug</RouterLink>
  </main>
</template>

<style>
</style>
