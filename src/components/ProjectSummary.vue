Media
<script setup lang="ts">
import type Project from "@/model/Project";
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const imgUrl = ref<string>();
const props = defineProps<{
  project?: Project;
}>();

onMounted(async () => {
  const mediaUrl = props.project?._links["wp:attachment"]?.[0].href;
  if (mediaUrl) {
    const media = (await axios.get(mediaUrl)).data;
    const img = new Image();
    img.onload = function () {
      imgUrl.value =
        media[0].media_details.sizes["project-archive"]?.source_url;
    };
    img.src = media[0]?.media_details.sizes["project-archive"]?.source_url;
  }
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
