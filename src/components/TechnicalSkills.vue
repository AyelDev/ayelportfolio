<template>
  <section class="technical container">
    <div class="technical-inner">
      <div class="technical-card">
        <h3>Technical Skills</h3>
        <p>
          My core expertise lies in building robust backends and interactive frontends.
          Here is a glimpse of my <strong>technical stack</strong>.
        </p>

        <!-- GRID WRAPPER -->
        <div class="skills-grid">

          <!-- LEFT: Backend -->
          <div class="skills-column">
            <h4 class="stack-title">Backend Development</h4>
            <Carousel v-bind="settings" dir="ttb" :height="400">
              <Slide v-for="skill in stack_backend" :key="skill.id">
                <div class="skill-card">
                  <div class="image-container">
                    <img :src="skill.image" :alt="skill.title" class="skill-img" />
                    <div class="level-tag">{{ skill.level }}</div>
                  </div>
                  <div class="skill-info">
                    <h4 class="skill-title">{{ skill.title }}</h4>
                    <p class="skill-desc">{{ skill.description }}</p>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>

          <!-- RIGHT: Frontend -->
          <div class="skills-column">
            <h4 class="stack-title">Frontend Development</h4>
            <Carousel v-bind="settings" dir="ttb" :height="400">
              <Slide v-for="skill in stack_frontend" :key="skill.id">
                <div class="skill-card">
                  <div class="image-container">
                    <img :src="skill.image" :alt="skill.title" class="skill-img" />
                    <div class="level-tag">{{ skill.level }}</div>
                  </div>
                  <div class="skill-info">
                    <h4 class="skill-title">{{ skill.title }}</h4>
                    <p class="skill-desc">{{ skill.description }}</p>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref } from 'vue'

const settings = {
  itemsToShow: 1,
  autoplay: 2500,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  transition: 500,
}

const stack_backend = ref([
  { id: 1, title: 'Java', level: 'Advanced', description: 'Spring Boot & Microservices', image: 'https://picsum.photos/400/300?random=11' },
  { id: 2, title: 'C#', level: 'Intermediate', description: '.NET Core & Entity Framework', image: 'https://picsum.photos/400/300?random=12' },
  { id: 3, title: 'PHP', level: 'Advanced', description: 'Laravel & WordPress', image: 'https://picsum.photos/400/300?random=13' },
  { id: 4, title: 'Node JS', level: 'Intermediate', description: 'Express & NestJS', image: 'https://picsum.photos/400/300?random=14' },
])

const stack_frontend = ref([
  { id: 1, title: 'Vue.js', level: 'Advanced', description: 'Composition API & Pinia', image: 'https://picsum.photos/400/300?random=21' },
  { id: 2, title: 'React', level: 'Intermediate', description: 'Hooks & Redux', image: 'https://picsum.photos/400/300?random=22' },
  { id: 3, title: 'TypeScript', level: 'Advanced', description: 'Type Safety & Scalability', image: 'https://picsum.photos/400/300?random=23' },
  { id: 4, title: 'Tailwind CSS', level: 'Expert', description: 'Utility-first styling', image: 'https://picsum.photos/400/300?random=24' },
])
</script>

<style scoped>
.technical {
  padding: 3rem 0;
}


.stack-title {
  font-size: 1.3rem;
  padding-left: 65px;
  /* 50px icon + 15px spacing */
  position: relative;
  display: flex;
  align-items: center;
  min-height: 50px;
  margin: 0;
  /* ensures icon fits vertically */
}

.stack-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  width: 50px;
  height: 50px;

  background: url("../assets/icons8-potion-100.png") no-repeat center;
  background-size: contain;
}

/* GRID LAYOUT */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Skill Card */
.skill-card {
  background: #ffffff;
  border: 5px solid #ffffff;
  border-radius: 12px;
  width: 30rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
}

.skill-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.level-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: var(--primColor);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
}

.skill-info {
  padding: 1rem;
}

.skill-title {
  margin: 0;
  font-size: 1.3rem;
  color: var(--primColor)
}

.skill-desc {
  font-size: 0.9rem;
  color: #7e7e7e;
  margin-top: 5px;
  -webkit-text-stroke: 0px;
}
</style>