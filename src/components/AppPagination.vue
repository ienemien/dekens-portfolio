<script setup lang="ts">
defineProps<{
  routeName: string;
  activePage: number;
  pageCount: number;
}>();
</script>

<template>
  <div>
    <nav>
      <RouterLink
        :to="{ name: routeName, query: { page: 1 } }"
        :class="{ disabled: activePage === 1 }"
      >
        &#10094;&#10094;
      </RouterLink>
      <RouterLink
        :to="{ name: routeName, query: { page: activePage - 1 } }"
        :class="{ disabled: activePage === 1 }"
      >
        &#10094;
      </RouterLink>
      <span>{{ activePage }}/{{ pageCount }}</span>
      <RouterLink
        :to="{ name: routeName, query: { page: activePage + 1 } }"
        :class="{ disabled: activePage === pageCount }"
      >
        &#10095;
      </RouterLink>
      <RouterLink
        :to="{ name: routeName, query: { page: pageCount } }"
        :class="{ disabled: activePage === pageCount }"
      >
        &#10095;&#10095;
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  margin: 15px 0;
  justify-content: center;
  grid-column: 1 / span 6;

  nav {
    a {
      font-family: "Courier New", Courier, monospace;
      font-size: 16px;
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 0 5px;
      border-radius: 5px;
      border: 1px solid gray;
      color: black;
      text-decoration: none;
      transition: background-color 0.3s;
      text-align: center;
      vertical-align: middle;
      line-height: 32px;

      &:hover {
        background-color: lightgray;
      }

      &.disabled {
        pointer-events: none;
        color: lightgray;
        cursor: not-allowed;
        border: 1px solid lightgray;
      }
    }

    span {
      display: none;

      @media screen and (min-width: 740px) {
        margin: 0 5px;
        display: inline-block;
      }
    }
  }
}
</style>
