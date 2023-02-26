<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function goBack() {
  router.back();
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
