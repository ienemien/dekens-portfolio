Media
<script setup lang="ts">
import type Project from "@/model/Project";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import type Media from "@/model/Media";

const media = ref<Media>();
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
      <RouterLink :to="{ name: 'project', params: { id: project?.id } }">
        <img
          v-if="media"
          :src="media.media_details.sizes['project-archive'].source_url"
        />
      </RouterLink>
      <time :datetime="postDateTime">{{ postDate }}</time>
      <h2 v-html="project?.title.rendered"></h2>
    </header>
    <p v-html="project?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'project', params: { id: project?.id } }"
      >&#10095; Lees verder</RouterLink
    >
  </article>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  justify-items: center;

  time {
    margin-top: 10px;
  }

  img {
    max-width: 300px;
  }
}

a {
  text-decoration: none;
  font-weight: bold;
  color: black;

  &:visited {
    color: black;
  }
}
</style>
