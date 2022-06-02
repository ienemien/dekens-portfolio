import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/werk",
      name: "work",
      component: () => import("../views/WorkView.vue"),
    },
    {
      path: "/educatie",
      name: "education",
      component: () => import("../views/EducationView.vue"),
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ProjectDetailView.vue"),
    },
    {
      path: "/atelier",
      name: "atelier",
      component: () => import("../views/AtelierView.vue"),
    },
    {
      path: "/winkel",
      name: "shop",
      component: () => import("../views/ShopView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/BlogPostDetailView.vue"),
    },
    {
      path: "/cv",
      name: "cv",
      component: () => import("../views/CurriculumView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
  ],
});

export default router;
