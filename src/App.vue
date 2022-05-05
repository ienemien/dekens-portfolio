<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderNav from "@/components/HeaderNav.vue";
</script>

<template>
  <div class="grid-container">
    <header>
      <h1>Jojanneke Dekens</h1>
      <HeaderNav></HeaderNav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr repeat(6, minmax(auto, 10em)) 1fr;
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);
}

header {
  display: grid;
  grid-column: span 8;
  grid-template-columns: repeat(3, 1fr);
}

header h1 {
  grid-column: 1 / span 1;
}

header nav {
  justify-self: right;
  grid-column: 2 / span 2;
}

main {
  grid-column: 1 / span 8;
}
</style>
