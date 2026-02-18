<template>
  <div id="portfolio">
  <Background3D />
    <Sidebar />
      
    <div class="main-content">
      <Header />
      <main>
        <section id="about">
          <AboutContact />
        </section>
        <section id="skills">
          <Hobbies />
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <!-- Contact section will go here -->
        </section>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Projects from './components/Projects.vue'
import AboutContact from './components/AboutContact.vue'
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