<script setup lang="ts">
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Projects from './components/Projects.vue'
import AboutContact from './components/AboutContact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="portfolio">
    <Header />
    <main>
      <Hero />
      <Projects />
      <AboutContact />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#portfolio {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
</style>
