<script setup lang="ts">
import AppLoader from "@/components/AppLoader.vue";
import AppPagination from "@/components/AppPagination.vue";
import ProjectSummary from "@/components/ProjectSummary.vue";
import PageDetails from "@/components/PageDetails.vue";
import type Project from "@/model/Project";
import ProjectService from "@/services/ProjectService";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useScrollBack } from "@/composables/ScrollBack";

const projectService = new ProjectService();
const loading = ref<boolean>(false);
const projects = ref<Project[]>([]);
const route = useRoute();
const activePage = ref(1);
const totalPages = ref(1);
useScrollBack("workPos");

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
  const response = await projectService.fetchProjects(
    activePage.value,
    [111, 110],
    "modified"
  );
  projects.value = (response?.posts as Project[]) ?? [];
  totalPages.value = response?.totalPages ?? 1;
  setTimeout(() => (loading.value = false), 1000);
}
</script>

<template>
  <PageDetails slug="werk"></PageDetails>
  <AppLoader v-if="loading"></AppLoader>
  <TransitionGroup name="list" tag="div" class="project-list">
    <ProjectSummary
      :project="project"
      v-for="project in projects"
      :key="project.id"
    />
  </TransitionGroup>
  <AppPagination
    v-if="activePage && totalPages"
    :route-name="'work'"
    :active-page="activePage"
    :page-count="totalPages"
  >
  </AppPagination>
</template>

<style scoped lang="scss">
@import "../assets/css/_load-posts.scss";
@import "../assets/css/_project-list.scss";
</style>
