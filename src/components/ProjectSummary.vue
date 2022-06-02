<script setup lang="ts">
import type Project from "@/model/Project";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import type PostMedia from "@/model/PostMedia";

const media = ref<PostMedia>();
const props = defineProps<{
  project?: Project;
}>();

const postDate = dayjs(props.project?.date).format("DD MMMM YYYY");
const postDateTime = dayjs(props.project?.date).format("YYYY-MM-DD");

onMounted(async () => {
  const mediaUrl = props.project?._links["wp:featuredmedia"][0].href;
  if (mediaUrl) {
    media.value = await (await fetch(mediaUrl)).json();
  }
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="project?.title.rendered"></h2>
      <img v-if="media" :src="media.media_details.sizes.medium.source_url" />
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="project?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'project', params: { id: project?.id } }"
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
