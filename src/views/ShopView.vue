<script setup lang="ts">
import PageDetails from "@/components/PageDetails.vue";
import { CategoryType } from "@/model/CategoryType";
import ProjectsOverview from "../components/ProjectsOverview.vue";

const categories = [CategoryType.WINKEL_HEDEN, CategoryType.WINKEL_VERLEDEN];
</script>

<template>
  <PageDetails slug="winkel"></PageDetails>
  <ProjectsOverview
    route-name="shop"
    :categories="categories"
  ></ProjectsOverview>
</template>
