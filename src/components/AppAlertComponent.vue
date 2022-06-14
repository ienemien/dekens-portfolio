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
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.error {
  color: red;
}

.warning {
  color: orange;
}
</style>
