<template>
  <v-app>
    <div v-if="layout === 'vertical'" class="d-flex">
      <SideBar />

      <v-main>
        <NavBar @switchLayout="layout = 'horizontal'" />
        <slot></slot>
      </v-main>
    </div>

    <div v-else>
      <NavBar @switchLayout="layout = 'vertical'" />
      <v-main>
        <slot></slot>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar";
const layout = ref("vertical");
</script>
