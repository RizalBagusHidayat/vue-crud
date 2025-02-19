<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      if (this.email === "admin@example.com" && this.password === "password") {
        this.errorMessage = "";
        this.$router.push("/users");
      } else {
        this.errorMessage = "Username atau password salah!";
      }
    },
  },
};
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center my-5"
    style="min-height: 90vh"
  >
    <div class="card shadow-lg p-4" style="max-width: 900px; width: 100%">
      <div class="row g-0 d-flex">
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/login.jpg" alt="Login Illustration" class="img-fluid" />
        </div>

        <div class="col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 class="fw-bold mb-2">Login</h2>

          <p v-if="errorMessage" class="alert alert-danger p-2">
            {{ errorMessage }}
          </p>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label"
                ><i class="bi bi-envelope"></i> Email</label
              >
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label"
                ><i class="bi bi-lock"></i> Password</label
              >
              <input
                type="password"
                class="form-control"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
