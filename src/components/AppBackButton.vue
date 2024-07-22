<script setup lang="ts">
import { type RouteLocationRaw, useRouter } from "vue-router";

const props = defineProps<{
  backPage?: RouteLocationRaw;
}>();

const router = useRouter();

function goBack() {
  window.history.state.back ? router.back() : router.push(props.backPage ?? '/');
}
</script>

<template>
  <a @click="goBack">&#10094; Terug</a>
</template>

<style lang="scss" scoped>
a {
  display: block;
  padding: 30px 0;
  font-weight: bold;
  cursor: pointer;
}
</style>
