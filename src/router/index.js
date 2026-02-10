import { createRouter, createWebHistory } from "vue-router";
import AddUser from "../views/AddUser.vue";
import UserS from "../views/UserS.vue";
import DashBoard from "@/views/DashBoard.vue";
import Settings from "../views/SettingDash.vue";
const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
  },
  {
    path: "/AddUser",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/UserS",
    name: "UserS",
    component: UserS,
  },
  {
    path: "/Settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
