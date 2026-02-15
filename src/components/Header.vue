<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'

const scrollToSection = (event: Event, targetId: string) => {
  event.preventDefault()
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<template>
  <header class="site-header">
    <div class="container header-row">
      <h1 class="brand"><a @click="(e) => scrollToSection(e, 'app')" href="#app"><span><</span>AyelDev<span>/></span></a></h1>
      <div style="display:flex;align-items:center;gap:0.75rem">
        <nav class="nav">
          <a @click="(e) => scrollToSection(e, 'about')" href="#about">About Me</a>
          <a @click="(e) => scrollToSection(e, 'skills')" href="#skills">Skills</a>
          <a @click="(e) => scrollToSection(e, 'projects')" href="#projects">Projects</a>
          <a @click="(e) => scrollToSection(e, 'contact')" href="#contact">Contact</a>
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
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(15, 15, 16, 0.8);
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
.nav a {
  margin-left: 1rem;
  color: inherit;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.nav a:hover::after {
  width: 100%;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }

/* Light theme adjustments */
html.light .site-header {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .site-header {
    padding: 0.75rem 0;
  }
  
  .nav a {
    margin-left: 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
