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
  <h1>Werk</h1>
  <PageDetails slug="werk"></PageDetails>
  <AppLoader v-if="loading"></AppLoader>
  <ul v-if="!loading" class="project-list">
    <li class="project-item" v-for="project in projects" :key="project.id">
      <ProjectSummary :project="project" />
    </li>
  </ul>
  <AppPagination
    v-if="activePage && totalPages"
    :route-name="'education'"
    :active-page="activePage"
    :page-count="totalPages"
  >
  </AppPagination>
</template>

<style scoped lang="scss">
.project-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;

  @media screen and (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
  }

  .project-item {
    list-style: none;
    border-radius: 5px;
    border: 1pt solid lightgray;
    box-shadow: 5px 5px 8px 5px rgb(235, 235, 235);
    padding: 15px;
  }
}
</style>
