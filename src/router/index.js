//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/users",
    name: "users.index",
    component: () => import("../views/users/index.vue"),
  },
  {
    path: "/create",
    name: "users.create",
    component: () => import("../views/users/create.vue"),
  },
  {
    path: "/users/edit/:id",
    name: "users.edit",
    component: () => import("../views/users/edit.vue"),
  },

  {
    path: "/auth/login",
    name: "auth.login",
    component: () => import("../views/login.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
