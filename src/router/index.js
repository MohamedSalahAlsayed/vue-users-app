import { createRouter, createWebHashHistory } from "vue-router";
import UserS from "../views/UserS.vue";
import AddUser from "../views/AddUser.vue";
import SettingsPage from "../views/SettingsPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // ضفنا صفحة التسجيل

const routes = [
  {
    path: "/LoginPage",
    name: "LoginPage",
    component: LoginPage,
    meta: { hideLayout: true },
  },
  {
    path: "/RegisterPage",
    name: "RegisterPage",
    component: RegisterPage,
    meta: { hideLayout: true },
  }, // مسار التسجيل
  { path: "/", name: "UserS", component: UserS },
  { path: "/AddUser", name: "AddUser", component: AddUser },
  { path: "/settingsPage", name: "SettingsPage", component: SettingsPage },
  {
    path: "/ProfilePage",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  // الصفحات المسموح دخولها من غير لوجن
  const publicPages = ["LoginPage", "RegisterPage"];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !isLoggedIn) {
    next({ name: "LoginPage" });
  } else if (!authRequired && isLoggedIn) {
    next({ name: "UserS" });
  } else {
    next();
  }
});

export default router;
