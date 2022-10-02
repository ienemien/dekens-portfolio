<script setup lang="ts">
import { useCalculateStartEnd } from "@/composables/CalculateStartEnd";
import { useScrollBack } from "@/composables/ScrollBack";
import type { CategoryType } from "@/model/CategoryType";
import type Project from "@/model/Project";
import ProjectService from "@/services/ProjectService";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProjectSummary from "./ProjectSummary.vue";
import AppPagination from "./AppPagination.vue";
import AppLoader from "./AppLoader.vue";

const projectService = new ProjectService();
const projects = ref<Project[]>([]);
const projectsForPage = ref<Project[]>([]);
const route = useRoute();
const activePage = ref(1);
const totalPages = ref(1);
const LOADER_TIME = 1000;
const PER_PAGE = 30;
const loading = ref<boolean>(false);

const props = defineProps<{
  routeName: string;
  categories: CategoryType[];
}>();

useScrollBack(`${props.routeName}Pos`);

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
      props.categories[0],
      props.categories[1],
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
  <AppLoader v-if="loading"></AppLoader>
  <TransitionGroup name="projects" tag="div" class="project-list">
    <ProjectSummary
      v-for="project in projectsForPage"
      :key="project.id"
      :project="project"
      :route-name="`${props.routeName}-detail`"
    />
  </TransitionGroup>
  <AppPagination
    v-if="activePage && totalPages && totalPages > 1"
    :route-name="props.routeName"
    :active-page="activePage"
    :page-count="totalPages"
  />
</template>

<style scoped lang="scss">
@import "../assets/css/_load-posts.scss";
@import "../assets/css/_project-list.scss";
</style>
