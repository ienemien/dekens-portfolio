<script setup lang="ts">
import type Page from "@/model/Page";
import MediaService from "@/services/MediaService";
import PageService from "@/services/PageService";
import { onMounted, ref } from "vue";

const pageService = new PageService();
const mediaService = new MediaService();
const imgUrl = ref<string>();
const props = defineProps<{
  slug?: string;
}>();

const page = ref<Page>();

onMounted(async () => {
  page.value = await pageService.fetchPageBySlug(props.slug ?? "");
  imgUrl.value = await mediaService.getFeaturedMediaUrl(page.value);
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
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
