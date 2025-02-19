<script setup></script>

<template>
  <div class="hero-section">
    <div class="overlay">
      <h1 class="title">Selamat Datang</h1>
      <p class="subtitle">
        Temukan berbagai fitur terbaik untuk meningkatkan pengalaman Anda!
      </p>
      <router-link :to="{ name: 'auth.login' }" class="btn btn-primary"
        >Masuk</router-link
      >
    </div>
  </div>
</template>
<style scoped>
.hero-section {
  background: url("/background.jpg") no-repeat center center/cover;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  color: white;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  padding: 50px;
  border-radius: 10px;
}
.title {
  font-size: 2.5rem;
  font-weight: bold;
}
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 15px;
}
</style>
