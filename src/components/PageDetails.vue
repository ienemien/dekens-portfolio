<script setup lang="ts">
import type Page from "@/model/Page";
import PageService from "@/services/PageService";
import axios from "axios";
import { onMounted, ref } from "vue";

const pageService = new PageService();
const imgUrl = ref<string>();
const props = defineProps<{
  slug?: string;
}>();

const page = ref<Page>();

onMounted(async () => {
  page.value = await pageService.fetchPageBySlug(props.slug ?? "");
  const mediaUrl = page.value?._links["wp:featuredmedia"]?.[0].href;
  if (mediaUrl) {
    const media = (await axios.get(mediaUrl)).data;
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
    height: 60vh;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
  transition-delay: 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
