<script setup lang="ts">
import PageDetails from "@/components/PageDetails.vue";
import { CategoryType } from "@/model/CategoryType";
import ProjectsOverview from "../components/ProjectsOverview.vue";

const categories = [CategoryType.WERK_HEDEN, CategoryType.WERK_VERLEDEN];
</script>

<template>
  <PageDetails slug="werk"></PageDetails>
  <ProjectsOverview
    route-name="work"
    :categories="categories"
  ></ProjectsOverview>
</template>
