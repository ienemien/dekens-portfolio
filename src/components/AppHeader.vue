<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "@vue/runtime-dom";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isWindowSizeLarge = () => window.innerWidth >= 992;
const showMenu = ref(isWindowSizeLarge());
const title = ref("");

watchEffect(async () => {
  const newTitle = route.meta.title;
  title.value = newTitle as string;
});

function closeMenu() {
  if (!isWindowSizeLarge()) {
    showMenu.value = false;
  }
}

function toggleShowMenu() {
  if (!isWindowSizeLarge()) {
    showMenu.value = !showMenu.value;
  }
}

function onWindowResize() {
  showMenu.value = isWindowSizeLarge();
}

onMounted(() => {
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});
</script>

<template>
  <header>
    <div class="title">
      <RouterLink to="/"><h1>Jojanneke Dekens</h1></RouterLink>
      <RouterLink :to="`/${route.path.split('/')[1]}`"
        ><h2 v-if="title" class="subtitle">{{ title }}</h2></RouterLink
      >
    </div>
    <button
      class="burger-menu"
      :class="{
        active: showMenu,
      }"
      @click="toggleShowMenu"
      @blur="closeMenu"
    >
      <span class="burger-line burger-line-1"></span>
      <span class="burger-line burger-line-2"></span>
      <span class="burger-line burger-line-3"></span>
    </button>
    <Transition>
      <nav v-if="showMenu">
        <ul>
          <li @click="closeMenu">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/werk">Werk</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/educatie">Educatie</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/winkel">Winkel</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/over-mij">Over mij</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/cv">CV</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
          <li @click="closeMenu">
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 20px 0 15px 0;
  background-color: white;
  z-index: 5;
  opacity: 0.95;
  box-shadow: 0 5px 10px rgba(138, 138, 177, 0.2);

  .title {
    grid-column: 2 / span 5;

    @media screen and (min-width: 992px) {
      grid-column: 2 / span 2;
    }

    a {
      text-decoration: none;
      &:visited {
        color: black;
      }
    }

    h1 {
      font-size: larger;
      margin: 0 0 5px 0;
      color: black;
    }

    .subtitle {
      font-size: large;
      font-weight: normal;
      margin: 0;
    }
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

    &.active {
      transform: rotate(-180deg);
    }

    @media screen and (min-width: 992px) {
      display: none;
    }
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

    &-1 {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      top: 40%;
    }

    &-2 {
      transform-origin: 100% 50%;
      transform: scaleX(1);
    }

    &-3 {
      transform: translateY(6px);
      top: 60%;
    }
  }

  .v-enter-active {
    transition: max-height 0.6s ease-out, opacity 0.4s ease-out;
  }

  .v-leave-active {
    transition: max-height 0.3s linear 0.3s, opacity 0.2s linear 0.3s;
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

  nav {
    grid-column: 2 / span 6;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      justify-self: right;
      grid-column: 4 / span 4;
    }

    ul {
      text-align: center;
      list-style: none;
      margin: 0;

      li {
        margin: 2px 8px;

        @media screen and (min-width: 992px) {
          display: inline;
        }

        a {
          font-size: medium;
          text-decoration: none;
          color: black;

          &:visited {
            color: black;
          }

          &.router-link-active {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
