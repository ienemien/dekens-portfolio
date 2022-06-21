<script setup lang="ts">
import { useAlertStore } from "@/stores/AlertStore";

const alertStore = useAlertStore();
</script>

<template>
  <ul v-if="alertStore.alerts">
    <li
      v-for="(alert, index) in alertStore.alerts"
      :key="index"
      :class="alert.type"
    >
      {{ alert.message }}
      <button @click="alertStore.closeAlert(alert)" aria-label="close alert">
        &times;
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  overflow-wrap: break-word;
  margin-bottom: 5px;
  padding: 20px;
  border-radius: 5px;
  list-style: none;

  &.error {
    background-color: rgb(251, 63, 73);
  }

  &.warning {
    background-color: rgb(244, 127, 64);
  }

  button {
    border-style: none;
    background: none;
    float: right;
    font-size: xx-large;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
}
</style>
