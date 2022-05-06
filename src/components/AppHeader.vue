<script setup lang="ts">
import { ref } from "@vue/runtime-dom";
import { RouterLink } from "vue-router";

const showMenu = ref(false);

function toggleShowMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <header>
    <h1>Jojanneke Dekens</h1>
    <button class="burger-menu" :class="{
      'active': showMenu
    }" @click="toggleShowMenu">
      <span class="burger-line burger-line-1"></span>
      <span class="burger-line burger-line-2"></span>
      <span class="burger-line burger-line-3"></span>
    </button>
    <Transition>
      <nav v-if="showMenu">
        <ul>
          <li @click="toggleShowMenu">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/werk">Werk</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/educatie">Educatie</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/atelier">Atelier</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/winkel">Winkel</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/cv">CV</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
          <li @click="toggleShowMenu">
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>

</template>

<style scoped>
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
  justify-self: center;
  grid-column: 2 / span 6;
  overflow: hidden;
}

ul {
  text-align: center;
  list-style: none;
  margin: 10px 0;
}

nav a {
  font-size: large;
  text-decoration: none;
  color: black;
}

nav a:visited {
  color: black;
}

nav li {
  margin: 2px 5px;
}

.burger-menu {
  grid-column: 7;
  justify-self: right;
  position: relative;
  height: 30px;
  width: 40px;
  display: block;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-menu.active {
  transform: rotate(-180deg);
}

.burger-line {
  background-color: black;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  border-radius: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-menu.active .burger-line {
  background-color: darkgray;
}

.burger-line-1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  top: 40%;
}

.burger-line-2 {
  transform-origin: 100% 50%;
  transform: scaleX(1);
}

.burger-line-3 {
  transform: translateY(6px);
  top: 60%;
}

.v-enter-active {
  transition: max-height 0.6s ease-out, opacity 0.4s ease-out;
}


.v-leave-active {
  transition: max-height 0.3s ease-in, opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  max-height: 200px;
}

/* For bigger screens */
@media screen and (min-width: 740px) {
  .burger-menu {
    display: none;
  }

  ul {
    display: inline;
  }

  header nav {
    justify-self: right;
    grid-column: 2 / span 6;
  }
}
</style>
