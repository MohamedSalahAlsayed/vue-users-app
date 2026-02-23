<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6" elevation="3" rounded="lg">
      <v-card-title class="text-center text-h5 font-weight-bold mb-4"
        >Login</v-card-title
      >

      <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
        {{ errorMessage }}
      </v-alert>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>

        <v-btn type="submit" color="primary" block size="large" class="mt-4"
          >Login</v-btn
        >
      </v-form>

      <div class="text-center mt-4">
        Don't have an account?
        <a href="#" @click.prevent="$router.push({ name: 'RegisterPage' })"
          >Register Now</a
        >
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = () => {
  if (email.value && password.value) {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    let existingUser = users.find((u) => u.email === email.value);

    if (!existingUser) {
      // لو الحساب مش موجود، نحوله لصفحة التسجيل
      router.push({ name: "RegisterPage" });
      return;
    }

    if (existingUser.password !== password.value) {
      errorMessage.value = "Incorrect password!";
      return;
    }

    // لو كل حاجة تمام، نسجل الدخول
    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      })
    );

    router.push({ name: "UserS" });
  }
};
</script>
