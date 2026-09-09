<template>
  <section class="projects container">
    <div class="projects-inner">

      <div class="projects-card">
        <h3>My Projects</h3>
        <p>
          When I'm not at my desk, you'll usually find me <strong>drawing</strong>.
          I love exploring digital illustration and traditional sketching to
          balance out my technical work.
        </p>

        <Carousel v-bind="settings" :breakpoints="breakpoints">
          <Slide v-for="project in projects" :key="project.id">
            <div class="project-card">
              <div class="image-container">
                <img :src="project.image" :alt="project.title" class="project-img" />
                <div class="status-tag">{{ project.status }}</div>
              </div>

              <div class="project-info">
                <h4 class="project-title">{{ project.title }}</h4>
                <div class="project-footer">
                  <span class="price">${{ project.price }}</span>
                  <div class="actions">
                    <button class="icon-btn">❤️</button>
                    <button class="icon-btn cart-btn">🛒</button>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref } from 'vue'

// Mock Data with Random Images
const projects = ref([
  { id: 1, title: 'Digital Portrait', price: 45, status: 'Completed', image: 'https://picsum.photos/400/300?random=1' },
  { id: 2, title: 'Cyberpunk City', price: 60, status: 'In Progress', image: 'https://picsum.photos/400/300?random=2' },
  { id: 3, title: 'Nature Sketches', price: 30, status: 'New', image: 'https://picsum.photos/400/300?random=3' },
  { id: 4, title: 'UI Kit Design', price: 85, status: 'Featured', image: 'https://picsum.photos/400/300?random=4' },
  { id: 5, title: 'Logo Concepts', price: 50, status: 'Completed', image: 'https://picsum.photos/400/300?random=5' },
])

// Carousel Settings
const settings = {
  itemsToShow: 1,
  snapAlign: 'center' as const,
}

// Responsive Breakpoints
const breakpoints = {
  700: {
    itemsToShow: 2,
    snapAlign: 'center' as const,
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'start' as const,
  },
}
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}

/* Card Styling */
.project-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin: 10px;
  overflow: hidden;
  text-align: left;
  transition: transform 0.2s;
}

.image-container {
  position: relative;
}

.project-img {
  width: 100%;
  display: block;
}

.status-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.project-info {
  padding: 1rem;
}

.project-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
}

.icon-btn {
  background: none;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  margin-left: 5px;
}

.cart-btn {
  background: #3b82f6;
  color: white;
  border: none;
}
</style>