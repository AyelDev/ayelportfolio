 
<template>

  <div class="component-wrapper">


    <section 
      ref="revealSection" 
      class="about container reveal-effect"
      :class="{ 'is-visible': isVisible }"
    >
      <div class="about-grid">
        <div class="about-content">
          <div class="tag">// Backend Infrastructure</div>
          <h3 style="-webkit-text-stroke: 1px black;">Half the Visual,<br/>Full the Logic.</h3>
          <p>
            I specialize in the parts of the system you don't see. 
            Scalable databases, optimized query layers, and robust API design.
          </p>
          
          <div class="contact">
            <p><a href="mailto:you@example.com">you@example.com</a></p>
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
import Background3D from './Background3D.vue'

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
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Rowdies', sans-serif;
}



.about {
  position: relative;
  z-index: 1;
  padding: 0 10%;
  height: 100vh;
  display: flex;
  align-items: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 4rem;
}

.tag {
  color: #61afef;
  font-family: 'Inter', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.about-content h3 { 
  font-size: clamp(2.5rem, 6vw, 4rem); 
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.1;
}

.about-content p { 
  font-size: 1.1rem;
  color: #abb2bf;
  max-width: 450px;
  line-height: 1.7;
}

.contact { margin-top: 3rem; }
.contact a { 
  color: #fff; 
  text-decoration: none; 
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 2px solid #61afef;
}

.reveal-effect {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-effect.is-visible {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1024px) {
  .about-grid { gap: 2rem; }
}

@media (max-width: 768px) {
  .about-grid { 
    grid-template-columns: 1fr; 
    text-align: center;
  }
  .about-content { margin: 0 auto; }
  .globe-space { height: 100px; }
}
</style>