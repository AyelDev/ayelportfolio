<template>
  <section class="resume container">
    <div class="resume-inner">
      <div class="hero-card">

        <h3>Download CV</h3>
        <p>
          Want a summary of my experience and skills? Download my resume.
        </p>

        <a :href="`${publicPath}resume/Ariel_Abelgas_Resume_Web_Programmer_2026.pdf`" download class="download-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="mdiDownload"/></svg>
          Download PDF
        </a>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mdiDownload } from '@mdi/js'

const publicPath = import.meta.env.BASE_URL
</script>

<style scoped>
.resume {
  padding: 2rem 0;
}

.resume-inner {
  max-width: 1067px;
  text-align: left;
}

.hero-card h3 {
  font-size: clamp(0.1rem, 6vw, 2rem);
  margin: 0;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.1;
}

.hero-card > p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2rem;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: #0f0f10;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(126, 219, 255, 0.3);
}
</style>
