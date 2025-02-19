<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../api";

const router = useRouter();

// Define state
const email = ref("");
const name = ref("");
const gender = ref("");
const status = ref("");
const errors = ref({});

// Validasi lokal sebelum mengirim data
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

  if (!gender.value) {
    errors.value.gender = ["Gender harus dipilih."];
  }

  if (!status.value) {
    errors.value.status = ["Status harus dipilih."];
  }

  return Object.keys(errors.value).length === 0;
};

// Store user method
const storeUser = async () => {
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
    await api.post("/users", userData);
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
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Create User</h4>
            <form @submit.prevent="storeUser()">
              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Email"
                />
                <span v-if="errors.email" class="text-danger small">{{
                  errors.email[0]
                }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Name"
                />
                <span v-if="errors.name" class="text-danger small">{{
                  errors.name[0]
                }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Gender</label>
                <select class="form-control" v-model="gender">
                  <option value="" hidden>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span v-if="errors.gender" class="text-danger small">{{
                  errors.gender[0]
                }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Status</label>
                <select class="form-control" v-model="status">
                  <option value="" hidden>Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <span v-if="errors.status" class="text-danger small">{{
                  errors.status[0]
                }}</span>
              </div>

              <button
                type="submit"
                class="btn btn-md btn-primary rounded-sm shadow border-0"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
