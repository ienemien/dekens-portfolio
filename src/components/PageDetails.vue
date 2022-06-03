<script setup lang="ts">
import type Media from "@/model/Media";
import type Page from "@/model/Page";
import PageService from "@/services/PageService";
import { onMounted, ref } from "vue";

const pageService = new PageService();
const media = ref<Media>();
const props = defineProps<{
  slug?: string;
}>();

const page = ref<Page>();

onMounted(async () => {
  const pages = await pageService.fetchPageBySlug(props.slug ?? "");
  page.value = pages[0];
  const mediaUrl = page.value._links["wp:featuredmedia"][0].href;
  if (mediaUrl) {
    media.value = await (await fetch(mediaUrl)).json();
  }
});
</script>

<template>
  <article>
    <img v-if="media" :src="media.source_url" />
    <p v-if="page" v-html="page?.content.rendered"></p>
  </article>
</template>

<style scoped lang="scss">
article {
  display: grid;
  justify-content: center;

  img {
    width: auto;
    height: 70vh;
  }
}
</style>
