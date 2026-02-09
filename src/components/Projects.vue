<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const projects = [
  { title: 'Project One', description: 'A short description of project one.', url: '#' },
  { title: 'Project Two', description: 'A short description of project two.', url: '#' },
  { title: 'Project Three', description: 'A short description of project three.', url: '#' },
  { title: 'Project Four', description: 'A short description of project four.', url: '#' }
]

const rail = ref<HTMLElement | null>(null)
let raf = 0
let lastTime = 0
const speed = 60 // pixels per second
let isPaused = false

function step(t: number){
  if(!rail.value) return
  if(!lastTime) lastTime = t
  const dt = (t - lastTime) / 1000
  lastTime = t

  if(!isPaused){
    rail.value.scrollLeft += speed * dt
    const half = rail.value.scrollWidth / 2
    if(rail.value.scrollLeft >= half){
      rail.value.scrollLeft -= half
    }
  }
  raf = requestAnimationFrame(step)
}

function pause(){ isPaused = true }
function resume(){ isPaused = false }

function onPointerDown(e: PointerEvent){
  if(!rail.value) return
  pause()
  (rail.value as any).setPointerCapture?.(e.pointerId)
  const startX = e.clientX
  const startScroll = rail.value.scrollLeft

  function move(ev: PointerEvent){
    const dx = ev.clientX - startX
    rail.value!.scrollLeft = startScroll - dx
  }
  function up(ev: PointerEvent){
    (rail.value as any).releasePointerCapture?.(ev.pointerId)
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    resume()
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

onMounted(()=>{
  // duplicate content is handled in template; start RAF
  raf = requestAnimationFrame(step)
})
onBeforeUnmount(()=>{
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="projects" class="projects container">
    <h3>Selected Projects</h3>

    <div
      class="carousel-rail"
      ref="rail"
      @mouseenter="pause"
      @mouseleave="resume"
      @pointerdown="onPointerDown">

      <div class="carousel-content">
        <article v-for="(p,i) in projects.concat(projects)" :key="i" class="card project-slide">
          <div class="project-inner">
            <h4>{{ p.title }}</h4>
            <p>{{ p.description }}</p>
            <a :href="p.url" class="link">View project →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects { padding: 2rem 0; }
.projects h3 { text-align: left; margin-bottom: 1rem; }
.carousel-rail { overflow-x: auto; scroll-behavior: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; scrollbar-width: none; -ms-overflow-style: none; }
.carousel-rail::-webkit-scrollbar { display: none; }
.carousel-content { display: inline-flex; gap: 1rem; padding-bottom: 0.5rem; }
.project-slide { display: inline-flex; min-width: 320px; max-width: 420px; box-sizing: border-box; padding: 1rem; border-radius: 12px; background: var(--card-bg); align-items: flex-start; }
.project-inner { text-align: left; }
.project-slide h4 { margin: 0 0 0.5rem; font-size: 1.15rem; }
.project-slide p { margin: 0 0 0.75rem; color: var(--muted); }
.link { color: var(--accent); text-decoration: none; font-weight:600; }

/* subtle scale effect for center of viewport via hover */
.project-slide:hover { transform: translateY(-6px) scale(1.02); transition: transform 220ms ease; box-shadow: 0 10px 30px rgba(2,6,23,0.35); }

@media (min-width: 900px) {
  .project-slide { min-width: 360px; }
}

@media (prefers-reduced-motion: reduce) {
  .project-slide, .project-slide:hover { transition: none !important; transform: none !important; }
}

</style>
