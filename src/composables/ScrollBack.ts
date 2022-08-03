import { useNavigationHistory } from "@/stores/NavigationHistory";
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";

export function useScrollBack(storageKey: string) {
  const navHistory = useNavigationHistory();
  const route = useRoute();
  const LOADER_TIME = 1000;

  onMounted(() => {
    const routes = navHistory.lastVisitedRoutes;
    const lastRoute = routes[routes.length - 1];
    const nextToLastRoute = routes[routes.length - 2];
    if (
      lastRoute.name === "project" &&
      nextToLastRoute.fullPath === route.fullPath
    ) {
      setTimeout(() => scrollToPreviousPosition(), LOADER_TIME);
    }
  });

  onBeforeUnmount(async () => {
    const scrollEl = document.scrollingElement;
    navHistory.setScrollPosition(storageKey, scrollEl?.scrollTop ?? 0);
  });

  function scrollToPreviousPosition() {
    const top = navHistory.scrollPosition(storageKey);
    if (top && document.scrollingElement) {
      document.scrollingElement.scrollTop = parseInt(top);
    }
  }
}
