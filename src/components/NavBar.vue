<template>
  <v-app-bar flat style="border-bottom: 1px solid #e5e7eb">
    <!-- Switch Layout -->
    <v-btn
      size="small"
      class="mx-3"
      color="primary"
      variant="tonal"
      @click="$emit('switchLayout')"
    >
      <v-icon size="22">mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-bold mx-0 px-0">
      Vue<span class="text-grey">Dashboard</span>
    </v-toolbar-title>

    <v-spacer />

    <v-switch
      v-model="isDark"
      inset
      class="mt-5 mx-2"
      @change="toggleTheme"
    ></v-switch>
  </v-app-bar>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import { useTheme } from "vuetify";
defineEmits(["switchLayout"]);

const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};
</script>
