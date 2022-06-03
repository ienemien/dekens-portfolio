<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type BlogPost from "@/model/BlogPost";
import type PostMedia from "@/model/PostMedia";
import BlogPostService from "@/services/BlogPostService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRoute } from "vue-router";

const postService = new BlogPostService();
const post = ref<BlogPost>();
const media = ref<PostMedia[]>([]);
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
  try {
    const routeParamId = route.params["id"];
    post.value = await postService.fetchPost(
      Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
    );
    await fetchMedia();
  } catch (err) {
    alert(err); // TODO: proper error handling
  }
});

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
    <div class="content" v-html="post?.content.rendered"></div>
    <AppBackButton></AppBackButton>
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

.content {
  &:deep(.wp-block-image) {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;

    img {
      width: 50vw;
      height: auto;
    }
  }
}
</style>
