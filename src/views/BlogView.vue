<script setup lang="ts">
import type Post from '@/model/Post';
import PostSummary from '@/components/PostSummary.vue';
import { ref, onMounted } from 'vue';

const posts = ref<Post[]>([]);
const URL = '/api/posts?page=1&per_page=5';

onMounted(async () => {
  posts.value = await (await fetch(URL)).json();
})
</script>

<template>
  <main>
    <h1>Blog</h1>
    <PostSummary v-for="post in posts" :key="post.id" :post="post"/>
  </main>
</template>
