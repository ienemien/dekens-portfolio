<script setup lang="ts">
import AppPagination from "@/components/AppPagination.vue";
import AppLoader from "@/components/AppLoader.vue";
import ProjectSummary from "@/components/ProjectSummary.vue";
import { ref } from "@vue/reactivity";
import type Project from "@/model/Project";
import ProjectService from "@/services/ProjectService";
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const projectService = new ProjectService();
const loading = ref<boolean>(false);
const projects = ref<Project[]>([]);
const route = useRoute();
const activePage = ref(1);
const totalPages = ref(1);

watch(
  () => route.query.page,
  async (newPageNr) => {
    if (newPageNr) {
      activePage.value = parseInt(newPageNr as string);
      await fetchProjects();
    }
  }
);

onMounted(async () => {
  activePage.value = route.query.page
    ? parseInt(route.query.page as string)
    : 1;
  await fetchProjects();
});

async function fetchProjects() {
  loading.value = true;
  const response = await projectService.fetchProjects(activePage.value, [112]);
  projects.value = (response?.posts as Project[]) ?? [];
  totalPages.value = response?.totalPages ?? 1;
  setTimeout(() => (loading.value = false), 1000);
}
</script>

<template>
  <AppLoader v-if="loading"></AppLoader>
  <TransitionGroup name="projects" tag="div" class="project-list">
    <ProjectSummary
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </TransitionGroup>
  <AppPagination
    v-if="activePage && totalPages"
    :route-name="'education'"
    :active-page="activePage"
    :page-count="totalPages"
  >
  </AppPagination>
</template>

<style scoped lang="scss">
@import "../assets/css/_load-posts.scss";
@import "../assets/css/_project-list.scss";
</style>
