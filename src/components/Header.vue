<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="site-header">
    <div class="container header-row">
      <h1 class="brand"><a href="/"><span><</span>AyelDev<span>/></span></a></h1>
      <div style="display:flex;align-items:center;gap:0.75rem">
        <nav class="nav">
          <a href="#projects">About me</a>
          <a href="#about">Skils</a>
          <a href="#contact">Projects</a>
          <a href="#portfolio">My Portfolio</a>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding: 1rem 0;
  background: transparent;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand a {
  font-weight: 700;
  color: inherit;
  text-decoration: none;
}
.nav a { margin-left: 1rem; color: inherit; text-decoration: none; }
.nav a:hover { color: var(--accent); }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
</style>
