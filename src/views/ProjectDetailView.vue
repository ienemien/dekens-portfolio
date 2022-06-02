<script setup lang="ts">
import type Project from "@/model/Project";
import type PostMedia from "@/model/PostMedia";
import ProjectService from "@/services/ProjectService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VueEasyLightbox from "vue-easy-lightbox";

const projectService = new ProjectService();
const post = ref<Project>();
const media = ref<PostMedia[]>([]);
const lightboxVisible = ref<boolean>(false);
const lightboxIndex = ref<number>(0);
const route = useRoute();
const router = useRouter();

const postDate = computed(() =>
  dayjs(post?.value?.date).format("DD MMMM YYYY")
);
const postDateTime = computed(() =>
  dayjs(post?.value?.date).format("YYYY-MM-DD")
);

const lightboxImgs = computed(() =>
  media.value.map((img) => {
    return { title: img.title.rendered, src: img.source_url };
  })
);

onMounted(async () => {
  try {
    const routeParamId = route.params["id"];
    post.value = await projectService.fetchProject(
      Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
    );
    await fetchMedia();
  } catch (err) {
    alert(err); // TODO: proper error handling
  }
});

function goBack() {
  router.back();
}

async function fetchMedia() {
  const mediaUrl = post.value?._links["wp:attachment"]?.[0].href;
  if (mediaUrl) {
    media.value = await (await fetch(mediaUrl)).json();
  }
}

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
      <h2 v-html="post?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <div class="gallery">
      <template v-for="(image, index) in media" :key="index">
        <img
          :src="
            image.media_details.sizes['project-thumbnail'].source_url ??
            image.source_url
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
    <p v-html="post?.content.rendered"></p>
    <a class="button-back" @click="goBack">Terug</a>
  </article>
</template>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  img {
    max-height: 100px;
    width: auto;
    overflow: hidden;
    margin: 2px;
    cursor: pointer;
  }
}

.button-back {
  cursor: pointer;
}
</style>
