<template>
  <v-navigation-drawer permanent width="260">
    <v-toolbar flat style="background-color: transparent">
      <v-toolbar-title class="font-weight-bold">
        Vue<span class="text-grey">Dashboard</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-list nav>
      <!-- <v-list-item
        class="listItemHover"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
      /> -->
      <v-list-item
        class="listItemHover"
        title="Users"
        @click="
          $router.push({
            name: 'UserS',
          })
        "
        prepend-icon="mdi-account-group"
      />
      <v-list-item
        class="listItemHover"
        title="Add User"
        @click="
          $router.push({
            name: 'AddUser',
          })
        "
        prepend-icon="mdi-account-plus"
      />
      <v-list-item
        class="listItemHover"
        title="Settings"
        @click="
          $router.push({
            name: 'Settings',
          })
        "
        prepend-icon="mdi-cog"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup></script>
<style scoped>
.listItemHover:hover {
  transition: 0.3ms all ease-in-out;
  cursor: pointer;
  background-color: rgb(33, 150, 243, 0.2);
}
</style>
