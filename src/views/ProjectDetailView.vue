Media
<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type Image from "@/model/Image";
import type Project from "@/model/Project";
import ProjectService from "@/services/ProjectService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, onUpdated, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRoute } from "vue-router";

const projectService = new ProjectService();
const project = ref<Project>();
const lightBoxImages = ref<Image[]>([]);
const lightBoxInitialized = ref<boolean>(false);
const lightboxVisible = ref<boolean>(false);
const lightboxIndex = ref<number>(0);
const route = useRoute();

const postDate = computed(() =>
  dayjs(project?.value?.date).format("DD MMMM YYYY")
);
const postDateTime = computed(() =>
  dayjs(project?.value?.date).format("YYYY-MM-DD")
);

function showLightbox(index?: number) {
  lightboxVisible.value = true;
  lightboxIndex.value = index ?? 0;
}

function hideLightbox() {
  lightboxVisible.value = false;
}

onMounted(async () => {
  const slug = route.params["slug"];
  project.value = await projectService.fetchProject(
    Array.isArray(slug) ? slug[0] : slug
  );
  const regex = /&#[0-9]{4};/g;
  document.title =
    project.value?.title.rendered.replace(regex, "'") ??
    (route.meta.title as string);

  (window as any).showLightbox = showLightbox;
});

onUpdated(() => {
  //some hacky stuff to make the lightbox work with images added in wordpress gallery block :-(
  const images = document.querySelectorAll(".content img");
  if (
    !lightBoxInitialized.value ||
    lightBoxImages.value.length !== images.length
  ) {
    lightBoxImages.value = Array.from(images).map((image, index) => {
      const src = image.attributes.getNamedItem("src")?.value;

      image.setAttribute("onclick", `showLightbox(${index})`);
      return {
        src,
        key: index,
      };
    });
    lightBoxInitialized.value = true;
  }
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="project?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <div class="gallery" v-if="lightBoxImages && lightBoxImages.length > 0">
      <VueEasyLightbox
        scrollDisabled
        escDisabled
        moveDisabled
        :index="lightboxIndex"
        :visible="lightboxVisible"
        :imgs="lightBoxImages"
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

  &:deep(.wp-block-image) {
    cursor: pointer;
  }

  &:deep(.wp-block-gallery) {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-around;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;

    & .wp-block-image {
      height: 70vw;
      max-width: 70vw;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      overflow: hidden;

      @media screen and (min-width: 768px) {
        height: 25vh;
        width: 25vh;
      }

      & img {
        display: block;
        width: 150%;
        height: auto;
        max-width: none;
      }
    }
  }
}
</style>
