<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api";

const router = useRouter();
const route = useRoute();

// Define state
const email = ref("");
const name = ref("");
const gender = ref("");
const status = ref("");
const errors = ref({});

// Fetch user data berdasarkan ID
const fetchUser = async () => {
  try {
    const response = await api.get(`/users/${route.params.id}`);
    const user = response.data;

    email.value = user.email;
    name.value = user.name;
    gender.value = user.gender;
    status.value = user.status;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// Validasi sebelum update
const validateForm = () => {
  errors.value = {};

  if (name.value.length < 5) {
    errors.value.name = ["Nama harus lebih dari 5 karakter."];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errors.value.email = [
      "Email harus dalam format yang benar (contoh: user@domain.com).",
    ];
  }

  return Object.keys(errors.value).length === 0;
};

// Update user method
const updateUser = async () => {
  if (!validateForm()) {
    return;
  }

  const userData = {
    email: email.value,
    name: name.value,
    gender: gender.value,
    status: status.value,
  };

  try {
    await api.put(`/users/${route.params.id}`, userData);
    router.push({ path: "/users" });
  } catch (error) {
    if (error.response && error.response.data) {
      errors.value = {};
      error.response.data.forEach((err) => {
        if (!errors.value[err.field]) {
          errors.value[err.field] = [];
        }
        errors.value[err.field].push(err.message);
      });
    }
  }
};

// Fetch data saat komponen dimuat
onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Edit User</h4>
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label class="form-label">Nama</label>
                <input v-model="name" type="text" class="form-control" />
                <div v-if="errors.name" class="text-danger small mt-1">
                  {{ errors.name[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" />
                <div v-if="errors.email" class="text-danger small mt-1">
                  {{ errors.email[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Gender</label>
                <select v-model="gender" class="form-control">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="status" class="form-control">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button type="submit" class="btn btn-primary">Update</button>
              <router-link to="/users" class="btn btn-secondary ms-2"
                >Cancel</router-link
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
