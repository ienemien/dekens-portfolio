<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="grid-container">
    <AppHeader></AppHeader>

    <main>
      <RouterView />
    </main>

    <AppFooter></AppFooter>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);

  main {
    padding: 100px 10px;
    grid-column: 1 / span 8;

    @media screen and (min-width: 740px) {
      grid-column: 2 / span 6;
    }
  }
}
</style>
