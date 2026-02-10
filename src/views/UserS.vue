<template>
  <div class="main-wrapper px-6 mt-5 py-5">
    <header class="page-header">
      <div class="page-title text-justify">
        <h1>Users Management</h1>
        <p>Manage your team members and their permissions.</p>
      </div>
      <button class="add-btn" @click="$router.push({ name: 'AddUser' })">
        <v-icon>mdi-plus-circle</v-icon>
        Add User
      </button>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>CreatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="arrayUser.length > 0">
          <tr v-for="(user, index) in arrayUser" :key="user.id">
            <td>
              <div class="user-info">
                <div class="avatar avatar-purple">
                  {{ user.name.substring(0, 2) }}
                </div>
                <div class="user-details">
                  <h3>{{ user.name }}</h3>
                  <p>{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td>
              <span class="badge badge-admin">{{ user.role }}</span>
            </td>
            <td>
              <span class="status-active">
                <span class="">{{ user.createdAt }}</span>
              </span>
            </td>
            <td class="actions">
              <!-- Edit Button -->
              <v-btn size="30" icon color="primary" @click="editUser(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <!-- Delete Button -->
              <v-btn size="30" icon color="red mx-1" @click="deleteUser(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">
              <p class="text-center">No users found</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const arrayUser = ref([]);
const deleteUser = (index) => {
  arrayUser.value.splice(index, 1);
  addlocalUser();
};

const addlocalUser = () => {
  localStorage.setItem("user", JSON.stringify(arrayUser.value));
};
const updateUser = () => {
  const savedData = localStorage.getItem("user");
  if (savedData) {
    arrayUser.value = JSON.parse(savedData);
  }
};
const editUser = (index) => {
  const userToEdit = arrayUser.value[index];
  router.push({
    name: "AddUser",
    query: {
      id: userToEdit.id,
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
      password: userToEdit.password,
    },
  });
};
onMounted(() => {
  updateUser();
});
</script>
<style>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-title h1 {
  font-size: 24px;
  font-weight: 700;
  /* color: #111827; */
  margin-bottom: 5px;
}

.page-title p {
  color: #6b7280;
  font-size: 14px;
}

.add-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  transition: background 0.3s;
}

.add-btn:hover {
  background-color: #4338ca;
}

.table-container {
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  border-bottom: 1px solid #e5e7eb;
}

th {
  padding: 16px 24px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #9ca3af;
  letter-spacing: 0.05em;
}

th:last-child {
  text-align: right;
}

tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  background-color: #f9fafb;
}

td {
  padding: 16px 24px;
  vertical-align: middle;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.avatar-purple {
  background-color: #eef2ff;
  color: #4f46e5;
}
.avatar-blue {
  background-color: #eff6ff;
  color: #2563eb;
}
.avatar-pink {
  background-color: #fdf2f8;
  color: #db2777;
}
.avatar-gray {
  background-color: #f3f4f6;
  color: #4b5563;
}

.user-details h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.user-details p {
  font-size: 13px;
  color: #6b7280;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.badge-admin {
  background-color: #f3e8ff;
  color: #7e22ce;
}

.badge-user {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-active {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #dcfce7;
}

.status-dot {
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
}

.actions {
  text-align: right;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #9ca3af;
  transition: color 0.2s;
  margin-left: 8px;
}

.action-btn:hover {
  color: #4f46e5;
}

.delete-btn:hover {
  color: #ef4444;
}
</style>
