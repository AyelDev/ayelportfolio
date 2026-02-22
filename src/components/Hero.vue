<template>
  <div class="component-wrapper">
    <section ref="revealSection" class="about container reveal-effect" :class="{ 'is-visible': isVisible }">
      <div class="about-grid">
        <div class="about-content">
          <div class="hero-card">
            <h1 class="about-title">Hi I'm <span class="highlight">Ariel</span></h1>
            <p class="hero-sub-title">Web/Backend Developer</p>
            <p class="about-description">
              I build scalable web applications and robust backend systems
              focused on performance, security, and clean architecture.
            </p>
          </div>
        </div>

        <div class="globe-space">
          <AstronautModel />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AstronautModel from './FlyingTower.vue'

const isVisible = ref(false);
const revealSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) isVisible.value = true;
  }, { threshold: 0.1 });

  if (revealSection.value) observer.observe(revealSection.value);
});

onBeforeUnmount(() => {
});
</script>

<style scoped>
.component-wrapper {
  position: relative;
  min-height: 100vh; /* Increased to give breathing room */
  display: flex;
  align-items: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* Gives text a bit more room */
  margin-top: 10rem;
  width: 100%;
  gap: 2rem;
}

/* --- THE GLASS CARD --- */
.hero-card {
  background: var(--card-bg); /* Semi-transparent white */
  backdrop-filter: blur(8px); /* The "Frosted" effect */
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* --- TEXT HIERARCHY --- */
.about-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.highlight {
  color: #ffffff; /* Or a primary color like #61afef */
}

.hero-sub-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  display: block;
}

.about-description {
  font-size: 1.2rem;
  line-height: 1.6; /* Fixed from -10rem */
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* --- ANIMATION --- */
.reveal-effect {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
}

.reveal-effect.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- RESPONSIVENESS --- */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-card {
    padding: 2rem;
  }
}
</style>