<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppAlertComponent from "./components/AppAlertComponent.vue";
</script>

<template>
  <AppHeader></AppHeader>
  <div class="grid-container">
    <main>
      <AppAlertComponent></AppAlertComponent>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);

  main {
    padding: 140px 10px 10px 10px;
    grid-column: 1 / span 8;

    @media screen and (min-width: 992px) {
      grid-column: 2 / span 6;
      padding: 90px 10px 10px 10px;
    }
  }
}
</style>
