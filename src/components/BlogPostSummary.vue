<script setup lang="ts">
import type Post from "@/model/BlogPost";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

const props = defineProps<{
  post?: Post;
}>();

const postDate = dayjs(props.post?.date).format("DD MMMM YYYY");
const postDateTime = dayjs(props.post?.date).format("YYYY-MM-DD");
</script>

<template>
  <article>
    <header>
      <h2 v-html="post?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="post?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'post', params: { id: post?.id } }"
      >Lees verder</RouterLink
    >
  </article>
</template>

<style scoped></style>
