Media
<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type Image from "@/model/Image";
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
const images = ref<Image[]>([]);
const lightboxVisible = ref<boolean>(false);
const lightboxIndex = ref<number>(0);
const route = useRoute();

const postDate = computed(() =>
  dayjs(project?.value?.date).format("DD MMMM YYYY")
);
const postDateTime = computed(() =>
  dayjs(project?.value?.date).format("YYYY-MM-DD")
);

onMounted(async () => {
  const slug = route.params["slug"];
  project.value = await projectService.fetchProject(
    Array.isArray(slug) ? slug[0] : slug
  );
  images.value = await mediaService.getProjectGallery(project.value);
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
    <div class="intro" v-html="project?.excerpt.rendered"></div>
    <div class="gallery" v-if="images && images.length > 0">
      <template v-for="(image, key, index) in images" :key="image.id">
        <img :src="image.thumbnail" @click="showLightbox(index)" />
      </template>
      <VueEasyLightbox
        scrollDisabled
        escDisabled
        moveDisabled
        :index="lightboxIndex"
        :visible="lightboxVisible"
        :imgs="images"
        @hide="hideLightbox"
      >
        <template v-slot:toolbar="{ toolbarMethods }">
          <div class="vel-toolbar">
            <div
              class="toolbar-btn toolbar-btn__zoomin"
              @click="toolbarMethods.zoomIn"
            >
              <svg class="vel-icon icon" aria-hidden="true">
                <use xlink:href="#icon-zoomin"></use>
              </svg>
            </div>
            <div
              class="toolbar-btn toolbar-btn__zoomout"
              @click="toolbarMethods.zoomOut"
            >
              <svg class="vel-icon icon" aria-hidden="true">
                <use xlink:href="#icon-zoomout"></use>
              </svg>
            </div>
            <div
              class="toolbar-btn toolbar-btn__resize"
              @click="toolbarMethods.resize"
            >
              <svg class="vel-icon icon" aria-hidden="true">
                <use xlink:href="#icon-resize"></use>
              </svg>
            </div>
          </div>
        </template>
      </VueEasyLightbox>
    </div>
    <div class="content" v-html="project?.content.rendered"></div>
    <AppBackButton></AppBackButton>
  </article>
</template>

<style lang="scss" scoped>
@import "../assets/css/_content.scss";
@import "../assets/css/_gallery.scss";

article {
  padding: 15px;

  header {
    margin-bottom: 15px;

    h2 {
      margin-block-start: 0;
      margin-block-end: 0;
    }

    time {
      display: inline-block;
      font-size: medium;
    }
  }

  &:deep(.vel-img-title) {
    display: none;
  }
}
</style>
