<script setup lang="ts">
import AppLoader from "@/components/AppLoader.vue";
import AppPagination from "@/components/AppPagination.vue";
import ProjectSummary from "@/components/ProjectSummary.vue";
import PageDetails from "@/components/PageDetails.vue";
import { useScrollBack } from "@/composables/ScrollBack";
import type Project from "@/model/Project";
import ProjectService from "@/services/ProjectService";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCalculateStartEnd } from "@/composables/CalculateStartEnd";
import { CategoryType } from "@/model/CategoryType";

const projectService = new ProjectService();
const loading = ref<boolean>(false);
const projects = ref<Project[]>([]);
const projectsForPage = ref<Project[]>([]);
const route = useRoute();
const activePage = ref(1);
const totalPages = ref(1);
const LOADER_TIME = 1000;
const PER_PAGE = 30;
useScrollBack("educationPos");

watch(
  () => route.query.page,
  async (newPageNr) => {
    activePage.value = parseInt((newPageNr ?? 1) as string);
    await fetchProjects();
  }
);

onMounted(async () => {
  activePage.value = route.query.page
    ? parseInt(route.query.page as string)
    : 1;
  await fetchProjects();
});

async function fetchProjects(): Promise<void> {
  loading.value = true;
  setTimeout(() => (loading.value = false), LOADER_TIME);
  if (projects.value.length === 0) {
    const response = await projectService.fetchProjectsInOrder(
      CategoryType.EDUCATIE_HEDEN,
      CategoryType.EDUCATIE_VERLEDEN,
      PER_PAGE
    );
    projects.value = (response?.posts as Project[]) ?? [];
    totalPages.value = response?.totalPages ?? 1;
  }
  const { start, end } = useCalculateStartEnd(
    activePage.value,
    totalPages.value,
    projects.value.length,
    PER_PAGE
  );
  projectsForPage.value = projects.value.slice(start, end);
}
</script>

<template>
  <PageDetails slug="educatie"></PageDetails>
  <AppLoader v-if="loading"></AppLoader>
  <TransitionGroup name="projects" tag="div" class="project-list">
    <ProjectSummary
      v-for="project in projectsForPage"
      :key="project.id"
      :project="project"
      :route-name="'education-detail'"
    />
  </TransitionGroup>
  <AppPagination
    v-if="activePage && totalPages && totalPages > 1"
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
