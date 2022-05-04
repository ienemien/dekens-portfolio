<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <h1>Jojanneke Dekens - Verwonderaar</h1>
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
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style></style>
