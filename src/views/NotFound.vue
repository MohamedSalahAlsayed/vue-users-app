<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>
    <v-btn
      class="my-4"
      variant="outlined"
      color="primary"
      prepend-icon="mdi-account-group"
      @click="$router.push('/')"
    >
      Go Users
    </v-btn>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
