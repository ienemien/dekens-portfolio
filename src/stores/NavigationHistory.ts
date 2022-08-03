import { defineStore } from "pinia";
import type { RouteLocationNormalized } from "vue-router";

export const useNavigationHistory = defineStore({
  id: "nav-history",
  state: () => ({
    lastVisitedRoutes: [] as RouteLocationNormalized[],
    scrollPositions: new Map(),
  }),
  getters: {
    scrollPosition: (state) => {
      return (key: string) => state.scrollPositions.get(key);
    },
  },
  actions: {
    setLastVisitedRoute(route: RouteLocationNormalized): void {
      this.lastVisitedRoutes.push(route);
      if (this.lastVisitedRoutes.length > 5) {
        this.lastVisitedRoutes = this.lastVisitedRoutes.slice(-5);
      }
    },
    setScrollPosition(key: string, position: number): void {
      this.scrollPositions.set(key, position);
    },
  },
});
