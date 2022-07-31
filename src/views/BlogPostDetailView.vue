Media
<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type BlogPost from "@/model/BlogPost";
import type Media from "@/model/Media";
import BlogPostService from "@/services/BlogPostService";
import MediaService from "@/services/MediaService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRoute } from "vue-router";

const postService = new BlogPostService();
const mediaService = new MediaService();
const post = ref<BlogPost>();
const media = ref<Media[]>([]);
const lightboxVisible = ref<boolean>(false);
const lightboxIndex = ref<number>(0);
const route = useRoute();

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
  const routeParamId = route.params["id"];
  post.value = await postService.fetchPost(
    Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
  );
  media.value = await mediaService.getMedia(post.value);
  const regex = /&#[0-9]{4};/g;
  document.title =
    post.value?.title.rendered.replace(regex, "") ??
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
    <div class="content" v-html="post?.content.rendered"></div>
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
}
</style>
