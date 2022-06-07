Media
<script setup lang="ts">
import type Media from "@/model/Media";
import type Project from "@/model/Project";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const media = ref<Media>();
const props = defineProps<{
  project?: Project;
}>();

onMounted(async () => {
  const mediaUrl = props.project?._links["wp:featuredmedia"][0].href;
  if (mediaUrl) {
    media.value = await (await fetch(mediaUrl)).json();
  }
});
</script>

<template>
  <article>
    <RouterLink :to="{ name: 'project', params: { id: project?.id } }">
      <img
        v-if="media"
        :src="media.media_details.sizes['project-archive'].source_url"
      />
      <h2 v-html="project?.title.rendered"></h2>
    </RouterLink>
    <p v-html="project?.excerpt.rendered"></p>
  </article>
</template>

<style lang="scss" scoped>
article {
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: black;

    &:visited {
      color: black;
    }

    img {
      max-width: 300px;
    }
  }
}
</style>
