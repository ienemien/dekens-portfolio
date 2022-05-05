<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/werk">Werk</RouterLink>
      </li>
      <li>
        <RouterLink to="/educatie">Educatie</RouterLink>
      </li>
      <li>
        <RouterLink to="/atelier">Atelier</RouterLink>
      </li>
      <li>
        <RouterLink to="/winkel">Winkel</RouterLink>
      </li>
      <li>
        <RouterLink to="/cv">CV</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Contact</RouterLink>
      </li>
      <li>
        <RouterLink to="/blog">Blog</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav li {
  display: inline;
  margin: 0 5px;
}
</style>
