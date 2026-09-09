<script setup lang="ts">
import { ref } from 'vue'
import { mdiMenu, mdiClose } from '@mdi/js'
import ThemeToggle from './ThemeToggle.vue'

const mobileMenuOpen = ref(false)

const scrollToSection = (event: Event, targetId: string) => {
  event.preventDefault()
  mobileMenuOpen.value = false
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

      <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen" :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path :d="mobileMenuOpen ? mdiClose : mdiMenu" />
        </svg>
      </button>

      <div style="display:flex;align-items:center;gap:0.75rem">
        <nav class="nav" :class="{ 'nav--open': mobileMenuOpen }">
          <a @click="(e) => scrollToSection(e, 'about')" href="#about">About Me</a>
          <a @click="(e) => scrollToSection(e, 'resume')" href="#resume">Download CV</a>
          <a @click="(e) => scrollToSection(e, 'skills')" href="#skills">Skills</a>
          <a @click="(e) => scrollToSection(e, 'projects')" href="#projects">Projects</a>
          <a @click="(e) => scrollToSection(e, 'contact')" href="#contact">Contact</a>
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

.hamburger {
  display: none;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .site-header {
    padding: 0.75rem 0;
  }

  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav {
    display: none;
  }

  .nav--open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(4, 0, 0, 0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 0 0 12px 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav--open a {
    margin-left: 0;
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: background 0.2s ease;
  }

  .nav--open a:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style>
