<script setup lang="ts">
import type Post from "@/model/BlogPost";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

const props = defineProps<{
  post?: Post;
}>();

const postDate = dayjs(props.post?.date).format("DD MMMM YYYY");
</script>

<template>
  <article>
    <h2 v-html="post?.title.rendered"></h2>
    <h3>{{ postDate }}</h3>
    <p v-html="post?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'post', params: { id: post?.id } }"
      >Lees verder</RouterLink
    >
  </article>
</template>

<style scoped></style>
