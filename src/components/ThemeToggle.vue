<script setup lang="ts">
import {
  mdiGithub,
  mdiLinkedin,
  mdiInstagram,
  mdiGmail
} from '@mdi/js'
</script>

<template>
  <div class="contact-wrapper">
    <a href="mailto:devyelabelgas@gmail.com" target="_blank" aria-label="Gmail">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="mdiGmail"/></svg>
    </a>

    <a href="https://github.com/ayeldev" target="_blank" aria-label="GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="mdiGithub"/></svg>
    </a>

    <a href="https://www.linkedin.com/in/ariel-abelgas-a87990361/" target="_blank" aria-label="LinkedIn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="mdiLinkedin"/></svg>
    </a>

    <a href="https://instagram.com/ayelblgs" target="_blank" aria-label="Instagram">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="mdiInstagram"/></svg>
    </a>
  </div>
</template>

<style scoped>
.contact-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;

  padding: 0.6rem 0.8rem;
  border-radius: 14px;

  /* Slightly transparent white background */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.contact-wrapper a {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 10px;
  color: #333;
  transition: all 0.25s ease;
}

.contact-wrapper a:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .contact-wrapper {
    top: auto;
    bottom: 1rem;
    right: 1rem;
    padding: 0.4rem 0.6rem;
    gap: 0.5rem;
    border-radius: 12px;
  }

  .contact-wrapper a {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .contact-wrapper a svg {
    width: 18px;
    height: 18px;
  }
}
</style>
