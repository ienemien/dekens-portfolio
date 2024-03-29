<script setup lang="ts">
import type BlogPost from "@/model/BlogPost";
import MediaService from "@/services/MediaService";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const mediaService = new MediaService();
const props = defineProps<{
  post?: BlogPost;
}>();
const imgUrl = ref<string>();

const postDate = dayjs(props.post?.date).format("DD MMMM YYYY");
const postDateTime = dayjs(props.post?.date).format("YYYY-MM-DD");

onMounted(async () => {
  let img = await mediaService.getFeaturedMediaUrl(props.post, "thumbnail");
  if (!img) {
    img = await mediaService.getProjectThumbnailUrl(props.post); //legacy project thumbnail
  }
  imgUrl.value = img;
});
</script>

<template>
  <article>
    <header>
      <Transition>
        <img v-if="imgUrl" :src="imgUrl" />
      </Transition>
      <RouterLink :to="{ name: 'blog-detail', params: { id: post?.id } }">
        <h2 v-html="post?.title.rendered"></h2>
      </RouterLink>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="post?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'blog-detail', params: { id: post?.id } }">
      Lees verder &#10095;
    </RouterLink>
  </article>
</template>

<style scoped lang="scss">
article {
  border-radius: 5px;
  border: 1pt solid lightgray;
  padding: 25px;

  header {
    h2 {
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0;
    }

    time {
      display: inline-block;
      margin-top: 10px;
      font-size: medium;
    }

    img {
      margin: 0 0 5px 5px;
      width: 140px;
      height: 140px;
      object-fit: contain;

      @media screen and (min-width: 992px) {
        float: right;
      }
    }
  }

  a {
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    color: black;

    &:hover {
      color: black;
    }

    &:visited {
      color: black;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 1.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
