<script setup lang="ts">
import type Post from "@/model/BlogPost";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import type BlogPostMedia from "@/model/BlogPostMedia";

const media = ref<BlogPostMedia[]>([]);
const props = defineProps<{
  post?: Post;
}>();

const postDate = dayjs(props.post?.date).format("DD MMMM YYYY");
const postDateTime = dayjs(props.post?.date).format("YYYY-MM-DD");

onMounted(async () => {
  const mediaUrl = props.post?._links["wp:attachment"]?.[0].href;
  if (mediaUrl) {
    media.value = await (await fetch(mediaUrl)).json();
  }
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="post?.title.rendered"></h2>
      <img
        v-if="media.length > 0"
        :src="media[0].media_details.sizes['project-thumbnail'].source_url"
      />
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="post?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'post', params: { id: post?.id } }"
      >Lees verder</RouterLink
    >
  </article>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: repeat(3 1fr);
}

header h1 {
  grid-column: 1 / span 1;
}

header img {
  justify-self: right;
  grid-column: 3 / span 1;
}
</style>
