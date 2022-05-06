<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <div class="grid-container">
    <AppHeader></AppHeader>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);
}

main {
  padding-top: 100px;
  grid-column: 2 / span 6;
}
</style>
