<script setup lang="ts">
import type Post from "@/model/BlogPost";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  post?: Post;
}>();
const imgUrl = ref<string>();

const postDate = dayjs(props.post?.date).format("DD MMMM YYYY");
const postDateTime = dayjs(props.post?.date).format("YYYY-MM-DD");

onMounted(async () => {
  const mediaUrl = props.post?._links["wp:attachment"]?.[0].href;
  if (mediaUrl) {
    const media = await (await fetch(mediaUrl)).json();
    const img = new Image();
    img.onload = function () {
      imgUrl.value =
        media[0].media_details.sizes["project-thumbnail"]?.source_url;
    };
    img.src = media[0].media_details.sizes["project-thumbnail"]?.source_url;
  }
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
      >Lees verder</RouterLink
    >
  </article>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: repeat(3 1fr);
}

header h1 {
  grid-column: 1 / span 1;
}

header img {
  justify-self: right;
  grid-column: 3 / span 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
