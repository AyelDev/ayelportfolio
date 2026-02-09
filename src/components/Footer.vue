<template>
  <footer class="site-footer">
    <div class="container">
      <small>© {{ new Date().getFullYear() }} AyelDev — Built with Vue + Vite</small>
    </div>
  </footer>
</template>

<script setup lang="ts">
// no-op script to allow runtime expression in template
</script>

<style scoped>
.site-footer { padding: 2rem 0 1rem; text-align:center; border-top:1px solid rgba(255,255,255,0.03); }
.site-footer small { color: rgba(255,255,255,0.6); }
</style>
