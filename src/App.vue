<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppAlertComponent from "./components/AppAlertComponent.vue";
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <AppHeader></AppHeader>
  <div class="grid-container">
    <main>
      <AppAlertComponent></AppAlertComponent>
      <RouterView />
    </main>
    <VueQueryDevtools />
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);

  main {
    margin-top: 120px;
    padding: 10px;
    grid-column: 1 / span 8;

    @media screen and (min-width: 992px) {
      grid-column: 2 / span 6;
    }

    &:deep(a) {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
