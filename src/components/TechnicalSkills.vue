<template>
  <section class="technical container">
    <div class="technical-inner">
      <div class="technical-card">
        <h3>Technical Skills</h3>

        <div class="skills-grid">
          <div v-for="category in skillCategories" :key="category.name" class="skill-category">
            <h4 class="category-name">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path :d="category.icon"/></svg>
              {{ category.name }}
            </h4>
            <div class="skill-tags">
              <span v-for="skill in category.skills" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  mdiCodeBraces,
  mdiPuzzle,
  mdiWeb,
  mdiStore,
  mdiDatabase,
  mdiTestTube,
  mdiSourceBranch,
  mdiHammer,
  mdiServer,
  mdiLightbulb,
  mdiRobot
} from '@mdi/js'

const skillCategories = [
  { name: 'Programming Languages', icon: mdiCodeBraces, skills: ['Java', 'C#', 'PHP', 'JavaScript', 'SQL'] },
  { name: 'Frameworks', icon: mdiPuzzle, skills: ['Laravel', 'Vue.js', 'Spring Boot', '.NET', 'CodeIgniter 4'] },
  { name: 'Web Technologies', icon: mdiWeb, skills: ['HTML', 'CSS', 'REST APIs', 'AJAX', 'jQuery'] },
  { name: 'CMS & E-Commerce', icon: mdiStore, skills: ['WordPress', 'WooCommerce', 'Shopify'] },
  { name: 'Databases', icon: mdiDatabase, skills: ['MySQL', 'PostgreSQL', 'SQL Server'] },
  { name: 'Testing', icon: mdiTestTube, skills: ['JUnit', 'Unit Testing', 'Mocking'] },
  { name: 'Version Control', icon: mdiSourceBranch, skills: ['Git', 'GitHub', 'Bitbucket'] },
  { name: 'Build & Automation', icon: mdiHammer, skills: ['Maven', 'Node.js'] },
  { name: 'DevOps & Deployment', icon: mdiServer, skills: ['Docker', 'IIS'] },
  { name: 'Development Practices', icon: mdiLightbulb, skills: ['OOP', 'Sprint', 'Agile', 'Design Patterns'] },
  { name: 'AI-Assisted Development', icon: mdiRobot, skills: ['ChatGPT', 'Claude', 'DeepSeek', 'Gemini', 'OpenCode'] },
]
</script>

<style scoped>
.technical {
  padding: 2rem 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

.skill-category {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.category-name {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  transition: background 0.2s ease, color 0.2s ease;
}

.skill-tag:hover {
  background: rgba(126, 219, 255, 0.15);
  color: #ffffff;
}
</style>
