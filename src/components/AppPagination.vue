<script setup lang="ts">
const props = defineProps<{
  routeName: string;
  activePage: number;
  pageCount: number;
}>();
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink
          :to="{ name: routeName, query: { page: 1 } }"
          :class="{ disabled: activePage === 1 }"
        >
          &#10094;&#10094;
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: routeName, query: { page: activePage - 1 } }"
          :class="{ disabled: activePage === 1 }"
        >
          &#10094;
        </RouterLink>
      </li>
      <li>
        <span>{{ activePage }}/{{ pageCount }}</span>
      </li>
      <li :class="{ disabled: activePage === pageCount }">
        <RouterLink
          :to="{ name: routeName, query: { page: activePage + 1 } }"
          :class="{ disabled: activePage === pageCount }"
        >
          &#10095;
        </RouterLink>
      </li>
      <li :class="{ disabled: activePage === pageCount }">
        <RouterLink
          :to="{ name: routeName, query: { page: pageCount } }"
          :class="{ disabled: activePage === pageCount }"
        >
          &#10095;&#10095;
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: center;
  grid-column: 1 / span 8;

  ul {
    list-style: none;
    margin: 20px 10px;

    li {
      display: inline-block;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid gray;
        color: black;
        margin: 5px;
        text-decoration: none;

        &:hover {
          background-color: lightgray;
        }

        &.active {
          background-color: orangered;
        }

        &.disabled {
          pointer-events: none;
          color: lightgray;
          cursor: not-allowed;
          border: 1px solid lightgray;
        }
      }

      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
