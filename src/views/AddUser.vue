<template>
  <v-container>
    <v-card class="pa-6 mx-auto" max-width="600" elevation="2">
      <h2>{{ isEdit ? "Edit User" : "Add New User" }}</h2>

      <v-form
        ref="formRef"
        v-model="isFormValid"
        @submit.prevent="saveUser"
        class="mt-4"
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
          label="Role"
          :rules="[rules.required]"
          variant="outlined"
        ></v-select>

        <v-text-field
          v-if="isEdit"
          v-model="user.createdAt"
          label="Created At"
          variant="outlined"
          readonly
          disabled
          prepend-inner-icon="mdi-calendar"
        ></v-text-field>

        <div v-if="isEdit" class="mb-4">
          <v-divider class="my-4"></v-divider>
          <p class="text-subtitle-1 mb-2 text-grey">
            Change Password (Optional)
          </p>
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            type="password"
            variant="outlined"
            hint="Enter current password to change it"
            persistent-hint
          ></v-text-field>
        </div>

        <div v-if="!isEdit || (isEdit && isCurrentPasswordCorrect)">
          <v-text-field
            v-model="user.password"
            label="New Password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            :rules="
              isEdit && !user.password
                ? []
                : [
                    rules.required,
                    rules.min8,
                    rules.hasUpper,
                    rules.hasLower,
                    rules.hasNumber,
                  ]
            "
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm New Password"
            :type="showPassword ? 'text' : 'password'"
            :rules="
              isEdit && !user.password ? [] : [rules.required, matchPassword]
            "
            variant="outlined"
          ></v-text-field>
        </div>

        <v-btn
          type="submit"
          color="primary"
          class="mt-4"
          size="large"
          :disabled="!isFormValid"
          block
        >
          {{ isEdit ? "Update User" : "Save User" }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const formRef = ref(null);
const isFormValid = ref(false);
const showPassword = ref(false);

const isEdit = computed(() => !!route.query.id);

const user = ref({
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  createdAt: "", // ضفنا الحقل هنا
});

const currentPassword = ref("");
const confirmPassword = ref("");
const actualCurrentPassword = ref("");

const isCurrentPasswordCorrect = computed(() => {
  return (
    currentPassword.value === actualCurrentPassword.value &&
    currentPassword.value !== ""
  );
});

const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min8: (v) => (v && v.length >= 8) || "Must be at least 8 characters",
  hasUpper: (v) =>
    /(?=.*[A-Z])/.test(v) || "Must contain at least one uppercase letter",
  hasLower: (v) =>
    /(?=.*[a-z])/.test(v) || "Must contain at least one lowercase letter",
  hasNumber: (v) => /(?=.*\d)/.test(v) || "Must contain at least one number",
};

const matchPassword = (v) =>
  v === user.value.password || "Passwords do not match";

onMounted(() => {
  if (isEdit.value) {
    user.value.id = route.query.id;
    user.value.name = route.query.name;
    user.value.email = route.query.email;
    user.value.role = route.query.role;
    user.value.createdAt = route.query.createdAt; // استلام التاريخ من الرابط
    actualCurrentPassword.value = route.query.password;
    user.value.password = "";
  }
});

const saveUser = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    let users = JSON.parse(localStorage.getItem("user")) || [];

    if (isEdit.value) {
      const index = users.findIndex((u) => u.id === user.value.id);
      if (index !== -1) {
        // لو مغيرش الباسورد، رجع الباسورد القديم
        const passwordToSave =
          user.value.password || actualCurrentPassword.value;

        users[index] = {
          ...user.value,
          password: passwordToSave,
        };

        // تحديث الـ Session لو اليوزر بيعدل بيانات نفسه
        const currentUser = JSON.parse(
          localStorage.getItem("currentUser") || "{}"
        );
        if (currentUser.id === user.value.id) {
          localStorage.setItem("currentUser", JSON.stringify(users[index]));
        }
      }
    } else {
      const newUser = {
        ...user.value,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      users.push(newUser);
    }

    localStorage.setItem("user", JSON.stringify(users));
    alert("Saved Successfully!");
    router.push({ name: "UserS" });
  }
};
</script>
