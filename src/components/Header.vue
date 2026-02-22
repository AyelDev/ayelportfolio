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
          <a @click="(e) => scrollToSection(e, 'app')" href="#about">About Me</a>
           <a @click="(e) => scrollToSection(e, 'hobbies')" href="#hobbies">Hobbies</a>
          <a @click="(e) => scrollToSection(e, 'skills')" href="#skills">Skills</a>
          <a @click="(e) => scrollToSection(e, 'projects')" href="#projects">Projects</a>
          <a @click="(e) => scrollToSection(e, 'footer')" href="#footer">Contact</a>
        </nav>
      </div>
    </div>
  </header>
        <ThemeToggle />

</template>

<style scoped>
.site-header {
  background: rgba(4, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px; 
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
  font-size: 1.3rem;
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
