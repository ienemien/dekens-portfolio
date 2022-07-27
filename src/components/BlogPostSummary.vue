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
  imgUrl.value = await mediaService.getThumbnailUrl(props.post);
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="post?.title.rendered"></h2>
      <Transition>
        <img v-if="imgUrl" :src="imgUrl" />
      </Transition>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <p v-html="post?.excerpt.rendered"></p>
    <RouterLink :to="{ name: 'post', params: { id: post?.id } }"
      >Lees verder &#10095;</RouterLink
    >
  </article>
</template>

<style scoped lang="scss">
article {
  padding: 5px;

  header {
    display: grid;
    grid-template-columns: repeat(3 1fr);

    h1 {
      grid-column: 1 / span 1;
    }

    img {
      margin: 3px;
      justify-self: right;
      grid-column: 3 / span 1;
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
