<template>
  <v-container>
    <h1 class="mb-6">Settings</h1>

    <v-card class="pa-5 mb-5" elevation="2">
      <h3 class="mb-4">Layout Settings</h3>

      <v-switch
        v-model="layoutSettings.isRtl"
        label="Right-to-Left Menu (RTL)"
        color="primary"
        @change="updateSettings"
      ></v-switch>

      <v-switch
        v-model="layoutSettings.isHorizontal"
        label="Horizontal Menu (Top Bar) instead of Sidebar"
        color="primary"
        @change="updateSettings"
      ></v-switch>
    </v-card>

    <v-card class="pa-5" elevation="2">
      <h3 class="mb-4">Theme Colors</h3>
      <div class="d-flex gap-4">
        <v-btn color="#4f46e5" @click="changePrimaryColor('#4f46e5')">
          Indigo
        </v-btn>
        <v-btn
          color="#db2777"
          class="mx-2"
          @click="changePrimaryColor('#db2777')"
        >
          Pink
        </v-btn>
        <v-btn color="#059669" @click="changePrimaryColor('#059669')">
          Green
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

// تخزين الإعدادات
const layoutSettings = ref({
  isRtl: false,
  isHorizontal: false,
});

const updateSettings = () => {
  localStorage.setItem("layoutSettings", JSON.stringify(layoutSettings.value));
  // Custom event لتحديث الـ App.vue أو LayOut.vue
  window.dispatchEvent(new Event("layout-changed"));
};

const changePrimaryColor = (color) => {
  // التغيير الصحيح في Vuetify 3 بيتم على الـ themes نفسها
  theme.themes.value.light.colors.primary = color;
  theme.themes.value.dark.colors.primary = color;

  // حفظ اللون في الـ localStorage عشان يفضل موجود بعد الـ Refresh
  localStorage.setItem("primaryColor", color);
};

onMounted(() => {
  // قراءة إعدادات اللي أوت
  const savedLayout = localStorage.getItem("layoutSettings");
  if (savedLayout) {
    layoutSettings.value = JSON.parse(savedLayout);
  }

  // قراءة اللون وتطبيقه أول ما الصفحة تفتح
  const savedColor = localStorage.getItem("primaryColor");
  if (savedColor) {
    theme.themes.value.light.colors.primary = savedColor;
    theme.themes.value.dark.colors.primary = savedColor;
  }
});
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
</style>
