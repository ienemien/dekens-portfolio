Media
<script setup lang="ts">
import type Project from "@/model/Project";
import MediaService from "@/services/MediaService";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const mediaService = new MediaService();
const imgUrl = ref<string>();
const props = defineProps<{
  project?: Project;
}>();

onMounted(async () => {
  imgUrl.value = await mediaService.getProjectArchive(props.project);
});
</script>

<template>
  <article>
    <RouterLink :to="{ name: 'project', params: { id: project?.id } }">
      <Transition>
        <img v-if="imgUrl" :src="imgUrl" />
      </Transition>
      <h2 v-html="project?.title.rendered"></h2>
    </RouterLink>
    <p v-html="project?.excerpt.rendered"></p>
  </article>
</template>

<style lang="scss" scoped>
article {
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: black;

    &:visited {
      color: black;
    }

    img {
      max-width: 300px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
