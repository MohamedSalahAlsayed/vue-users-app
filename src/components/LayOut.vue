<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-app-bar
      v-if="!$route.meta.hideLayout"
      flat
      style="border-bottom: 1px solid #e5e7eb"
    >
      <v-btn
        v-if="!layoutSettings.isHorizontal"
        size="small"
        class="mx-3"
        color="primary"
        variant="tonal"
        @click="drawer = !drawer"
      >
        <v-icon size="22">mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title
        class="font-weight-bold mx-0 px-0 cursor-pointer"
        @click="$router.push('/')"
      >
        Vue<span class="text-grey">Dashboard</span>
      </v-toolbar-title>

      <v-spacer />

      <div v-if="layoutSettings.isHorizontal" class="hidden-sm-and-down">
        <v-btn variant="text" @click="$router.push({ name: 'UserS' })"
          >Users</v-btn
        >
        <v-btn variant="text" @click="$router.push({ name: 'AddUser' })"
          >Add User</v-btn
        >
        <v-btn variant="text" @click="$router.push({ name: 'SettingsPage' })"
          >Settings</v-btn
        >
      </div>

      <v-spacer v-if="layoutSettings.isHorizontal" />

      <v-switch
        v-model="isDark"
        inset
        class="mt-5 mx-2"
        @change="toggleTheme"
      ></v-switch>

      <v-menu v-if="isLoggedIn">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary" size="35">
              <span class="text-white">
                {{ currentUser?.name?.substring(0, 1) || "U" }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            title="My Profile"
            prepend-icon="mdi-account"
            @click="$router.push({ name: 'ProfilePage' })"
          ></v-list-item>
          <v-list-item
            title="Logout"
            prepend-icon="mdi-logout"
            color="red"
            @click="logout"
          ></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-if="!layoutSettings.isHorizontal && !$route.meta.hideLayout"
      v-model="drawer"
      :location="layoutSettings.isRtl ? 'right' : 'left'"
      class="custom-drawer"
    >
      <v-list nav>
        <v-list-item
          title="Users"
          prepend-icon="mdi-account-group"
          @click="$router.push({ name: 'UserS' })"
        />
        <v-list-item
          title="Add User"
          prepend-icon="mdi-account-plus"
          @click="$router.push({ name: 'AddUser' })"
        />
        <v-list-item
          title="Settings"
          prepend-icon="mdi-cog"
          @click="$router.push({ name: 'SettingsPage' })"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"; // شيلنا computed وضفنا watch
import { useTheme } from "vuetify";
import { useRouter, useRoute } from "vue-router"; // ضفنا useRoute

const theme = useTheme();
const router = useRouter();
const route = useRoute(); // تعريف الـ route عشان نراقبه

const drawer = ref(true);
const isDark = ref(theme.global.current.value.dark);
const layoutSettings = ref({ isRtl: false, isHorizontal: false });

// خليناهم ref بدل computed عشان نقدر نحدثهم يدوياً
const isLoggedIn = ref(!!localStorage.getItem("token"));
const currentUser = ref(
  JSON.parse(localStorage.getItem("currentUser") || "{}")
);

// الدالة اللي بتحدث حالة تسجيل الدخول
const updateAuthStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("token");
  currentUser.value = JSON.parse(localStorage.getItem("currentUser") || "{}");
};

// مراقبة اللينكات: أول ما تتنقل من اللوجن للداشبورد الدالة دي هتشتغل وتظهر الأيقونة فوراً
watch(
  () => route.path,
  () => {
    updateAuthStatus();
  }
);

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "dark" : "light";
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  // تحديث الحالة فوراً عشان الأيقونة تختفي
  updateAuthStatus();
  router.push({ name: "LoginPage" });
};

const loadSettings = () => {
  const savedSettings = localStorage.getItem("layoutSettings");
  if (savedSettings) layoutSettings.value = JSON.parse(savedSettings);

  const savedColor = localStorage.getItem("primaryColor");
  // تصليح تحميل اللون عشان يشتغل صح مع Vuetify 3
  if (savedColor) {
    theme.themes.value.light.colors.primary = savedColor;
    theme.themes.value.dark.colors.primary = savedColor;
  }
};

onMounted(() => {
  loadSettings();
  // Listen to custom event from Settings.vue
  window.addEventListener("layout-changed", loadSettings);
});
</script>
