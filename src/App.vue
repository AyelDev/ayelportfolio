<template>
  <div id="portfolio">
    <Background3D />

    <div class="main-content">
      <Header />
      <main>
        <section id="about">
          <Hero />
        </section>
        <section id="hobbies">
          <Hobbies />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </main>
      <Footer id="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Projects from './components/Projects.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'
import Skills from './components/TechnicalSkills.vue'
import Hobbies from './components/Hobbies.vue'
import Background3D from './components/Background3D.vue'
</script>

<style scoped>
#portfolio {
  min-height: 100vh;
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

section {
  min-height: 100vh;
  padding: 2rem 0;
}

@media (max-width: 1024px) {
  #portfolio {
    flex-direction: column;
  }
}
</style>