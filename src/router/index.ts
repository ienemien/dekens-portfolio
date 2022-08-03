import { useNavigationHistory } from "@/stores/NavigationHistory";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/werk",
      name: "work",
      component: () => import("../views/WorkView.vue"),
      meta: {
        title: "Werk",
      },
    },
    {
      path: "/educatie",
      name: "education",
      component: () => import("../views/EducationView.vue"),
      meta: {
        title: "Educatie",
      },
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ProjectDetailView.vue"),
      meta: {
        title: "Project",
      },
    },
    {
      path: "/atelier",
      name: "atelier",
      component: () => import("../views/AtelierView.vue"),
      meta: {
        title: "Atelier",
      },
    },
    {
      path: "/winkel",
      name: "shop",
      component: () => import("../views/ShopView.vue"),
      meta: {
        title: "Winkel",
      },
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
      meta: {
        title: "Blog",
      },
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/BlogPostDetailView.vue"),
      meta: {
        title: "Blogpost",
      },
    },
    {
      path: "/cv",
      name: "cv",
      component: () => import("../views/CurriculumView.vue"),
      meta: {
        title: "CV",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: {
        title: "Contact",
      },
    },
  ],
});

router.beforeEach((toRoute, fromRoute, next) => {
  const navHistory = useNavigationHistory();
  navHistory.setLastVisitedRoute(fromRoute);
  window.document.title = (toRoute.meta?.title as string) ?? "Jojanneke Dekens";

  next();
});

export default router;
