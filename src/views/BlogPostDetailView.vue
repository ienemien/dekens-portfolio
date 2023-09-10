<script setup lang="ts">
import AppBackButton from "@/components/AppBackButton.vue";
import type BlogPost from "@/model/BlogPost";
import BlogPostService from "@/services/BlogPostService";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const postService = new BlogPostService();
const post = ref<BlogPost>();
const route = useRoute();

const postDate = computed(() =>
  dayjs(post?.value?.date).format("DD MMMM YYYY")
);

const postDateTime = computed(() =>
  dayjs(post?.value?.date).format("YYYY-MM-DD")
);

onMounted(async () => {
  const routeParamId = route.params["id"];
  post.value = await postService.fetchPost(
    Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
  );
  const regex = /&#[0-9]{4};/g;
  document.title =
    post.value?.title.rendered.replace(regex, "") ??
    (route.meta.title as string);
});
</script>

<template>
  <article>
    <header>
      <h2 v-html="post?.title.rendered"></h2>
      <time :datetime="postDateTime">{{ postDate }}</time>
    </header>
    <div class="content" v-html="post?.content.rendered"></div>
    <AppBackButton></AppBackButton>
  </article>
</template>

<style lang="scss" scoped>
@import "../assets/css/_content.scss";

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
