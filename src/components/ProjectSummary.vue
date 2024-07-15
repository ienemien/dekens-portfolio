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
  routeName?: string;
}>();

onMounted(async () => {
  imgUrl.value = await mediaService.getFeaturedMediaUrl(
    props.project,
    "medium"
  );
});
</script>

<template>
  <RouterLink
    :to="{ name: routeName ?? 'project', params: { slug: project?.slug } }"
  >
    <Transition>
      <div v-if="imgUrl || project?.title.rendered">
        <img v-if="imgUrl" :src="imgUrl" />
        <div class="summary-info">
          <h2 v-html="project?.title.rendered"></h2>
        </div>
      </div>
    </Transition>
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  display: block;
  position: relative;
  border-radius: 5px;
  border: 1pt solid lightgray;
  overflow: hidden;
  font-size: small;
  margin: 0 0 10px 0;
  aspect-ratio: 1 / 1;
  flex: 100%;
  text-decoration: none;
  font-weight: bold;
  color: black;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    flex: 30%;
    margin: 10px;
    max-width: 30%;
  }

  &:visited {
    color: black;
  }

  div {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .summary-info {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 10px;
      background-color: white;
      opacity: 0.9;
      width: 100%;
      height: 95px;

      h2 {
        margin-block-start: 0;
        margin-block-end: 0;
        margin: 1px 0;
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
