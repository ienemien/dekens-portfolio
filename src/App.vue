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
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: minmax(1em, auto) 1fr auto minmax(1em, auto);
}

header {
  position: fixed;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 20px 0;
  box-shadow: 0 3px 5px rgb(230, 230, 230);
  background-color: white;
  z-index: 20;
}

header h1 {
  margin: 0;
  grid-column: 2 / span 3;
}

header nav {
  justify-self: right;
  grid-column: 5 / span 3;
}

main {
  padding-top: 100px;
  grid-column: 2 / span 6;
}
</style>
