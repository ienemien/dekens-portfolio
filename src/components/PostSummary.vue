<script setup lang="ts">
import type Post from "@/model/Post";

const props = defineProps<{
    post?: Post
}>()
</script>

<template>
    <article>
        <h2 v-html="post?.title.rendered"></h2>
        <p v-html="post?.excerpt.rendered"></p>
        <RouterLink :to="{ name: 'post', params: { id: post?.id }}">Lees verder</RouterLink>
    </article>
</template>

<style scoped>
</style>
