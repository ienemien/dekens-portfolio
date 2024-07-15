<script setup lang="ts">
import PageDetails from "@/components/PageDetails.vue";
import { CategoryType } from "@/model/CategoryType";
import ProjectsOverview from "@/components/ProjectsOverview.vue";

const categories = [
  CategoryType.EDUCATIE_HEDEN,
  CategoryType.EDUCATIE_VERLEDEN,
];
</script>

<template>
  <PageDetails slug="educatie"></PageDetails>
  <ProjectsOverview
    route-name="education"
    :categories="categories"
  ></ProjectsOverview>
</template>
