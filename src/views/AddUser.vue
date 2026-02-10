<template>
  <v-container class="mt-5 user-form-container" max-width="600px">
    <!-- Title -->
    <div class="mb-6">
      <h1 class="form-title">Add New User</h1>
      <p class="form-subtitle">
        Fill in the details below to create a new user account.
      </p>
    </div>

    <form action="#" @submit.prevent="saveOrUpdateUser">
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input
          type="text"
          v-model="objectUser.name"
          placeholder="Enter full name"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model="objectUser.email"
          placeholder="Enter email address"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Role</label>
        <select v-model="objectUser.role" class="form-control" required>
          <option value="" disabled="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model="objectUser.password"
          placeholder="Enter password"
          required
          class="form-control"
        />
      </div>

      <div class="form-actions">
        <v-btn variant="outlined" color="grey" class="mx-2" @click="resetForm">
          Cancel
        </v-btn>

        <v-btn color="primary" type="submit"> Add User </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const arrayUser = ref([]);

const objectUser = ref({
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  createdAt: "",
});
const userList = () => {
  localStorage.setItem("user", JSON.stringify(arrayUser.value));
};
const updateUser = () => {
  const savedData = localStorage.getItem("user");
  if (savedData) {
    arrayUser.value = JSON.parse(savedData);
  }
};
const saveOrUpdateUser = () => {
  updateUser();

  if (objectUser.value.id) {
    const index = arrayUser.value.findIndex(
      (userId) => userId.id == objectUser.value.id
    );

    if (index !== -1) {
      arrayUser.value[index] = {
        ...arrayUser.value[index],
        ...objectUser.value,
      };
    }
  } else {
    objectUser.value.id = Date.now();
    objectUser.value.createdAt = new Date();
    arrayUser.value.push(objectUser.value);
  }

  userList();

  resetForm();

  router.push("/");
};
const resetForm = () => {
  objectUser.value = {
    name: "",
    email: "",
    role: "",
    password: "",
  };
};
onMounted(() => {
  updateUser();
  if (route.query.id) {
    objectUser.value = {
      id: route.query.id,
      name: route.query.name,
      email: route.query.email,
      role: route.query.role,
      password: route.query.password,
    };
  }
});
</script>

<style scoped>
.user-form-container {
  background-color: var(--v-surface-base);
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--v-theme-on-surface);
  margin-bottom: 6px;
}

.form-subtitle {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  min-width: 120px;
}

/* Hover effects */
.v-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1rem;
  text-align: justify;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 900;
  /* color: #212529; */
  font-size: 14px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  /* color: #495057; */
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* Focus */
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

/* Placeholder */
.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}
</style>
