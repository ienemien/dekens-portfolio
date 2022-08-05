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
  imgUrl.value = await mediaService.getProjectArchiveUrl(props.project);
});
</script>

<template>
  <article>
    <RouterLink :to="{ name: 'project', params: { id: project?.id } }">
      <Transition>
        <div>
          <img v-if="imgUrl" :src="imgUrl" />
          <div class="summary-info">
            <h2 v-html="project?.title.rendered"></h2>
          </div>
        </div>
      </Transition>
    </RouterLink>
  </article>
</template>

<style lang="scss" scoped>
article {
  position: relative;
  border-radius: 5px;
  border: 1pt solid lightgray;
  overflow: hidden;
  font-size: small;
  margin: 0 0 10px 0;
  aspect-ratio: 1 / 1;
  flex: 100%;

  @media screen and (min-width: 768px) {
    flex: 30%;
    margin: 10px;
    max-width: 30%;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    cursor: pointer;

    &:visited {
      color: black;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .summary-info {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 10px;
      background-color: white;
      opacity: 0.9;
      width: 100%;

      div {
        display: inline-block;

        &:deep(p) {
          margin-block-start: 0;
          margin-block-end: 0;
        }
      }
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
