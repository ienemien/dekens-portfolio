Media
<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type Media from "@/model/Media";
import type Project from "@/model/Project";
import MediaService from "@/services/MediaService";
import ProjectService from "@/services/ProjectService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRoute } from "vue-router";

const projectService = new ProjectService();
const mediaService = new MediaService();
const project = ref<Project>();
const media = ref<Media[]>([]);
const lightboxVisible = ref<boolean>(false);
const lightboxIndex = ref<number>(0);
const route = useRoute();

const postDate = computed(() =>
  dayjs(project?.value?.date).format("DD MMMM YYYY")
);
const postDateTime = computed(() =>
  dayjs(project?.value?.date).format("YYYY-MM-DD")
);

const lightboxImgs = computed(() =>
  media.value.map((img) => {
    return { title: img.title.rendered, src: img.source_url };
  })
);

onMounted(async () => {
  const routeParamId = route.params["id"];
  project.value = await projectService.fetchProject(
    Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
  );
  media.value = await mediaService.getMedia(project.value);
  const regex = /&#[0-9]{4};/g;
  document.title =
    project.value?.title.rendered.replace(regex, "'") ??
    (route.meta.title as string);
});

function showLightbox(index?: number) {
  lightboxVisible.value = true;
  lightboxIndex.value = index ?? 0;
}

function hideLightbox() {
  lightboxVisible.value = false;
}
</script>

<template>
  <article>
    <header>
      <h2 v-html="project?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <div class="gallery" v-if="media && media.length > 0">
      <template v-for="(image, index) in media" :key="index">
        <img
          v-if="image.media_type === 'image'"
          :src="
            image.media_details.sizes.medium?.source_url ?? image.source_url
          "
          @click="showLightbox(index)"
        />
      </template>
      <VueEasyLightbox
        scrollDisabled
        escDisabled
        moveDisabled
        :index="lightboxIndex"
        :visible="lightboxVisible"
        :imgs="lightboxImgs"
        @hide="hideLightbox"
      >
      </VueEasyLightbox>
    </div>
    <div class="content" v-html="project?.content.rendered"></div>
    <AppBackButton></AppBackButton>
  </article>
</template>

<style lang="scss" scoped>
@import "../assets/css/_content.scss";
@import "../assets/css/_gallery.scss";
</style>
