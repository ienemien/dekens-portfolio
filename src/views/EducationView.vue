<script setup lang="ts">
import AppPagination from "../components/AppPagination.vue";
import AppLoader from "../components/AppLoader.vue";
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
  const response = await projectService.fetchProjects(activePage.value);
  projects.value = (response?.posts as Project[]) ?? [];
  totalPages.value = response?.totalPages ?? 1;
  loading.value = false;
}
</script>

<template>
  <main>
    <h1>Educatie</h1>
    <AppLoader v-if="loading"></AppLoader>
    <ul v-if="!loading" class="blogpost-list">
      <li class="blogpost-item" v-for="project in projects" :key="project.id">
        <p>{{ project['project-categories'] }}</p>
        <p>{{ project.excerpt.rendered }}</p>
        <!-- <BlogPostSummary :post="post" /> -->
      </li>
    </ul>
    <AppPagination :route-name="'education'" :active-page="activePage" :page-count="totalPages">
    </AppPagination>
  </main>
</template>
