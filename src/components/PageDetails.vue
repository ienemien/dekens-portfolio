<script setup lang="ts">
import type Page from "@/model/Page";
import PageService from "@/services/PageService";
import { onMounted, ref } from "vue";

const pageService = new PageService();
const imgUrl = ref<string>();
const props = defineProps<{
  slug?: string;
}>();

const page = ref<Page>();

onMounted(async () => {
  const pages = await pageService.fetchPageBySlug(props.slug ?? "");
  page.value = pages[0];
  const mediaUrl = page.value._links["wp:featuredmedia"]?.[0].href;
  if (mediaUrl) {
    const media = await (await fetch(mediaUrl)).json();
    const img = new Image();
    img.onload = function () {
      imgUrl.value = media?.source_url;
    };
    img.src = media?.source_url;
  }
});
</script>

<template>
  <article>
    <Transition>
      <img v-show="imgUrl" :src="imgUrl" />
    </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
  transition-delay: 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
