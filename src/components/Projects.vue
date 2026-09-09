<template>
  <section class="projects container">
    <div class="projects-inner">

      <div class="projects-card">
        <h3>Experience & Projects</h3>

        <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
          <div class="experience-header">
            <h4 class="experience-role">{{ exp.role }}</h4>
            <a v-if="exp.link" :href="exp.link" target="_blank" class="experience-company">{{ exp.company }}</a>
            <span v-else class="experience-company">{{ exp.company }}</span>
          </div>
          <span class="experience-duration">{{ exp.duration }}</span>
          <ul class="experience-highlights">
            <li v-for="(item, i) in exp.highlights" :key="i">
              {{ item.text }}
              <button v-if="item.link" @click="togglePreview(item.link)" class="preview-btn">
                {{ activePreview === item.link ? 'Close' : 'Preview' }}
              </button>
            </li>
          </ul>

          <div v-if="activePreview && exp.highlights.some(h => h.link === activePreview)" class="preview-container">
            <div class="preview-header">
              <span class="preview-url">{{ activePreview }}</span>
              <button @click="activePreview = null" class="preview-close">Close</button>
            </div>
            <iframe
              v-if="!previewFailed"
              :src="activePreview"
              @error="previewFailed = true"
              sandbox="allow-scripts allow-same-origin"
              class="preview-iframe"
            />
            <div v-else class="preview-fallback">
              <p>This site can't be embedded.</p>
              <a :href="activePreview" target="_blank" class="preview-open">Open in new tab</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Highlight {
  text: string
  link?: string
}

interface Experience {
  role: string
  company: string
  duration: string
  highlights: Highlight[]
  link?: string
}

const experiences = ref<Experience[]>([
  {
    role: 'Software Engineer',
    company: 'Auksilyo Professionals',
    duration: 'Jan 2025 – Jun 2026',
    highlights: [
      { text: 'Developed a .NET application for Sargent and Greenleaf using .NET, Angular, and SQL Express.' },
      { text: 'Collaborated with cross-functional teams to deliver secure and scalable solutions.' },
    ],
  },
  {
    role: 'PHP Programmer',
    company: 'Proweaver Inc.',
    duration: 'Jun 2025 – Present',
    highlights: [
      { text: 'KD Sports USA: Built an e-commerce platform with WooCommerce, WordPress, and MySQL, enabling product management and online shopping.', link: 'https://www.kdsportsusa.com/' },
      { text: 'Purity Tutoring Services Portal: Designed an online tutoring system for NCLEX nursing exam prep using Laravel, Vue.js, and MySQL, including authentication, student accounts, and course registration.', link: 'https://www.puritytutoringservicesnclex.com/' },
      { text: 'PetsNeedMeds: Migrated data from PrestaShop to WooCommerce, ensuring seamless transfer of product catalogs, customer records, and order history. Implemented PHP, WordPress, and MySQL integrations to stabilize the new e-commerce system.', link: 'https://www.petsneedmeds.com/' },
      { text: 'AyCare Service Portal: Built a Laravel + Vue.js portal for developmental disability care services, including authentication, user dashboards, and service management.' },
      { text: 'SamahCare Portal: Developed a healthcare portal using CodeIgniter 4, implementing patient management and service workflows.', link: 'https://www.samahcare.com/portal/' },
      { text: 'MassBay AFC Caregiver Portal (MLU Portal): Designed and implemented a caregiver management portal using Laravel, Vue.js, and MySQL, supporting secure login, caregiver workflows, and data management.' },
      { text: 'My Little University Portal: Developed an education portal using Laravel, Vue.js, and MySQL.', link: 'https://www.mylittleu.com/portal/login' },
    ],
  },
])

const activePreview = ref<string | null>(null)
const previewFailed = ref(false)

function togglePreview(url: string) {
  if (activePreview.value === url) {
    activePreview.value = null
  } else {
    activePreview.value = url
    previewFailed.value = false
  }
}
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}

/* Experience Styling */
.experience-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-item:last-of-type {
  border-bottom: none;
  margin-bottom: 0.5rem;
  padding-bottom: 0;
}

.experience-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.experience-role {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
}

.experience-company {
  font-size: 1.1rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.experience-company:hover {
  text-decoration: underline;
}

.experience-duration {
  display: block;
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0.25rem 0 0.75rem;
}

.experience-highlights {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.experience-highlights li {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0.35rem;
}

/* Preview Button */
.preview-btn {
  display: inline;
  margin-left: 0.5rem;
  padding: 0;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-family: inherit;
}

.preview-btn:hover {
  color: #ffffff;
}

/* Preview Container */
.preview-container {
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-url {
  font-size: 0.8rem;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-close {
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: inherit;
}

.preview-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.preview-iframe {
  width: 100%;
  height: 500px;
  border: none;
  background: #ffffff;
}

.preview-fallback {
  padding: 3rem 1rem;
  text-align: center;
}

.preview-fallback p {
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 1rem;
}

.preview-open {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: #0f0f10;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.preview-open:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .preview-iframe {
    height: 60vw;
    min-height: 250px;
  }

  .preview-header {
    padding: 0.4rem 0.5rem;
  }

  .preview-url {
    font-size: 0.7rem;
  }

  .experience-header {
    flex-direction: column;
    gap: 0.25rem;
  }

  .experience-highlights li {
    font-size: 0.9rem;
  }
}
</style>