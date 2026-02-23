<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="500" class="pa-6" elevation="3" rounded="lg">
      <v-card-title class="text-center text-h5 font-weight-bold mb-4">
        Register Now
      </v-card-title>

      <v-form
        ref="formRef"
        v-model="isFormValid"
        @submit.prevent="handleRegister"
      >
        <v-text-field
          v-model="user.name"
          label="Full Name"
          :rules="[rules.required]"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="Email"
          type="email"
          :rules="[rules.required, rules.email]"
          variant="outlined"
        ></v-text-field>

        <v-select
          v-model="user.role"
          :items="['admin', 'user']"
          label="Select Role"
          :rules="[rules.required]"
          variant="outlined"
          color="primary"
        ></v-select>

        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          :rules="[rules.required, rules.min8]"
          variant="outlined"
        ></v-text-field>

        <v-btn
          type="submit"
          color="success"
          block
          size="large"
          class="mt-4"
          :disabled="!isFormValid"
        >
          Create Account
        </v-btn>
      </v-form>

      <div class="text-center mt-4">
        Already have an account?
        <a href="#" @click.prevent="$router.push({ name: 'LoginPage' })">
          Login here
        </a>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const formRef = ref(null);
const isFormValid = ref(false);

// إضافة role هنا عشان يبدأ بقيمة افتراضية
const user = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min8: (v) => (v && v.length >= 8) || "Must be at least 8 characters",
};

const handleRegister = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    // جلب المستخدمين من الـ localStorage (تأكد إن الاسم 'user' متطابق مع صفحة الـ Users عندك)
    let users = JSON.parse(localStorage.getItem("user")) || [];

    // التأكد إن الإيميل مش متسجل قبل كدا
    if (users.find((u) => u.email === user.value.email)) {
      alert("This email is already registered!");
      return;
    }

    // حفظ اليوزر الجديد بالبيانات المختارة
    const newUser = {
      id: Date.now().toString(),
      name: user.value.name,
      email: user.value.email,
      role: user.value.role, // هنا هياخد admin أو user حسب اختيارك
      password: user.value.password,
      createdAt: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));

    alert("Account created successfully! Please login.");
    router.push({ name: "LoginPage" });
  }
};
</script>
