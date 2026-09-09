<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="portfolio-container">
    <h1>{{ msg }}</h1>
    <p class="subtitle">Welcome to my portfolio</p>
    
    <section class="about">
      <h2>About Me</h2>
      <p>Full-stack developer passionate about creating beautiful and functional web applications.</p>
    </section>
    
    <section class="projects">
      <h2>Featured Projects</h2>
      <div class="project-grid">
        <div class="project-card">
          <h3>Project 1</h3>
          <p>Description of your first project</p>
        </div>
        <div class="project-card">
          <h3>Project 2</h3>
          <p>Description of your second project</p>
        </div>
        <div class="project-card">
          <h3>Project 3</h3>
          <p>Description of your third project</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

section {
  margin: 3rem 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #646cff;
  padding-bottom: 0.5rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
  margin-top: 0;
  color: #646cff;
}

.project-card p {
  color: #666;
  margin-bottom: 0;
}
</style>
