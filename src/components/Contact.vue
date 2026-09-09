<template>
  <section class="contact container">
    <div class="contact-inner">
      <div class="contact-card">
        <h3>Contact Me</h3>
        <p>Feel free to reach out — I'm always open to new opportunities and collaborations.</p>

        <div class="contact-list">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" class="contact-icon"><path :d="mdiMapMarker"/></svg>
            <div>
              <span class="contact-label">Address</span>
              <span class="contact-value">35-A Andres Abellana Extension Guadalupe Cebu City, Philippines, 6000</span>
            </div>
          </div>

          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" class="contact-icon"><path :d="mdiPhone"/></svg>
            <div>
              <span class="contact-label">Phone</span>
              <a href="tel:+639060846583" class="contact-value">0906 084 6583</a>
            </div>
          </div>

          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" class="contact-icon"><path :d="mdiEmail"/></svg>
            <div>
              <span class="contact-label">Email</span>
              <a href="mailto:arielabelgas.dev@gmail.com" class="contact-value">arielabelgas.dev@gmail.com</a>
            </div>
          </div>

          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" class="contact-icon"><path :d="mdiGithub"/></svg>
            <div>
              <span class="contact-label">GitHub</span>
              <a href="https://github.com/AyelDev" target="_blank" class="contact-value">github.com/AyelDev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  mdiMapMarker,
  mdiPhone,
  mdiEmail,
  mdiGithub
} from '@mdi/js'
</script>

<style scoped>
.contact {
  padding: 2rem 0;
}

.contact-inner {
  max-width: 1067px;
  text-align: left;
}

.contact-card h3 {
  font-size: clamp(0.1rem, 6vw, 2rem);
  margin: 0;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.1;
}

.contact-card > p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-item div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.contact-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.contact-value {
  font-size: 1.05rem;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease;
}

a.contact-value:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .contact-card {
    padding: 1.5rem;
  }
}
</style>
