<template>
  <v-container>
    <v-card
      class="mx-auto pa-6 mt-5"
      max-width="500"
      elevation="3"
      rounded="lg"
    >
      <div class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" size="100" class="mb-4 elevation-2">
          <span class="text-h3 text-white">{{ getInitials(user.name) }}</span>
        </v-avatar>

        <h2 class="text-h5 font-weight-bold">{{ user.name }}</h2>
        <p class="text-grey-darken-1">{{ user.email }}</p>

        <v-chip class="mt-3" color="success" variant="flat" size="small">
          <v-icon start icon="mdi-check-circle"></v-icon>
          Active
        </v-chip>
      </div>

      <v-divider class="my-6"></v-divider>

      <h3 class="text-subtitle-1 font-weight-bold mb-3 text-grey-darken-1">
        Account Details
      </h3>

      <v-list bg-color="transparent" class="pa-0">
        <v-list-item class="px-0 mb-2">
          <template v-slot:prepend>
            <v-avatar color="primary" variant="tonal" rounded>
              <v-icon>mdi-account-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium"
            >Full Name</v-list-item-title
          >
          <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0 mb-2">
          <template v-slot:prepend>
            <v-avatar color="primary" variant="tonal" rounded>
              <v-icon>mdi-email-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium"
            >Email Address</v-list-item-title
          >
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0">
          <template v-slot:prepend>
            <v-avatar color="primary" variant="tonal" rounded>
              <v-icon>mdi-shield-account-outline</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium">Role</v-list-item-title>
          <v-list-item-subtitle>Administrator</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider class="my-6"></v-divider>

      <div class="d-flex justify-center gap-4">
        <v-btn
          color="primary"
          @click="editProfile"
          variant="outlined"
          prepend-icon="mdi-pencil"
        >
          Edit Profile
        </v-btn>
        <v-btn
          color="error"
          variant="text"
          prepend-icon="mdi-logout"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// بيانات افتراضية لحد ما نقرأ من الـ localStorage
const user = ref({
  name: "User Name",
  email: "user@example.com",
});

// دالة عشان تجيب أول حرفين من اسم اليوزر وتحطهم في الـ Avatar
const getInitials = (name) => {
  if (!name) return "U";
  const nameParts = name.split(" ");
  if (nameParts.length > 1) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// دالة تسجيل الخروج
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  router.push({ name: "LoginPage" }); // اتأكد إن دي LoginPage زي ما صلحناها
};

// دالة التعديل (الجديدة)
const editProfile = () => {
  // بنجيب كل المستخدمين عشان نطلع الداتا الكاملة بتاعة اليوزر الحالي (بالباسورد والـ ID)
  const allUsers = JSON.parse(localStorage.getItem("user")) || [];
  const fullUserData =
    allUsers.find((u) => u.email === user.value.email) || user.value;

  router.push({
    name: "AddUser",
    query: {
      id: fullUserData.id,
      name: fullUserData.name,
      email: fullUserData.email,
      role: fullUserData.role || "Admin",
      password: fullUserData.password,
    },
  });
};

// أول ما الصفحة تفتح، بنقرأ بيانات اليوزر من الـ localStorage
onMounted(() => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
</style>
