<template>
  <div>
    <section 
      ref="revealSection" 
      class="about container reveal-effect"
      :class="{ 'is-visible': isVisible }"
    >
      <div class="about-grid">
        
        <div class="about-content">
          <h3>About Me</h3>
          <p>
            I’m a frontend developer focused on creating pleasant user experiences 
            and performant applications. I enjoy <strong>TypeScript</strong>, 
            <strong>Vue</strong>, and <strong>a11y-first design</strong>.
          </p>
          
          <div id="contact" class="contact">
            <h4>Contact</h4>
            <p>Email — <a href="mailto:you@example.com">you@example.com</a></p>
          </div>
        </div>

        <div class="about-frame">
          <div class="image-square">
            <img src="https://via.placeholder.com/400" alt="Profile Portrait" />
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- Scroll-Reveal Logic ---
const isVisible = ref(false);
const revealSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Set visible to true when 20% of the element enters the screen
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    });
  }, { threshold: 0.2 });

  if (revealSection.value) {
    observer.observe(revealSection.value);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');

/* --- HERO SECTION STYLES --- */
.hero-section {
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center_me {
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
}

.editor-window {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: #282c34;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.code-row { display: flex; align-items: baseline; }
.indent { margin-left: 4ch; }
.code-line { font-size: 5vmin; margin: 0; color: #e4bb68; line-height: 1.2; }

/* Syntax Colors */
.white { color: #abb2bf; }
.red { color: #e06c75; }
.blue { color: #61afef; }

/* Ticker Animation */
.string-window { height: 6vmin; overflow: hidden; }
.string-track {
  display: flex;
  flex-direction: column;
  animation: scroll-up 8s cubic-bezier(0.76, 0, 0.24, 1) infinite;
  animation-play-state: paused; /* Hover to play */
}

.center_me:hover .string-track {
  animation-play-state: running;
}

.greeting {
  font-size: 5.5vmin;
  line-height: 6vmin;
  height: 6vmin;
  margin: 0;
  font-weight: 500;
}

.en { color: #98c379; }
.es { color: #fa8231; }
.de { color: #c678dd; }
.it { color: #56b6c2; }

@keyframes scroll-up {
  0%, 15%   { transform: translateY(0); }
  20%, 35%  { transform: translateY(-6vmin); }
  40%, 55%  { transform: translateY(-12vmin); }
  60%, 75%  { transform: translateY(-18vmin); }
  80%, 100% { transform: translateY(-24vmin); }
}

/* --- ABOUT SECTION & REVEAL --- */
.about {
  padding: 5rem 10%;
  max-width: 1100px;
  margin: 0 auto;
}

.about-grid {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.about-content { flex: 1; }

.about-frame {
  flex: 0 0 320px;
  border: 3px solid #333;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 12px 12px 0px #333;
  transition: transform 3s ease;
}

.image-square {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f0f0f0;
  overflow: hidden;
}

.image-square img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Scroll-Reveal CSS Classes */
.reveal-effect {
  opacity: 0;
  transform: translateY(60px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-effect.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact { margin-top: 2rem; }

/* Responsive */
@media (max-width: 768px) {
  .about-grid { flex-direction: column-reverse; gap: 3rem; }
  .about-frame { flex: 0 0 auto; width: 280px; }
  .code-line, .greeting { font-size: 4.5vmin; }
}
</style>