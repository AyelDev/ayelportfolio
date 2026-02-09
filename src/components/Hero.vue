<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const phrases = ["Hi — I'm Ayel", 'I build fast web apps', 'I focus on accessibility']
const text = ref('')
const cursorVisible = ref(true)
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let tickTimer: number | undefined
let cursorTimer: number | undefined

function tick(){
  const current = phrases[phraseIndex]
  if(!isDeleting){
    // type
    charIndex++
    text.value = current.slice(0, charIndex)
    if(charIndex >= current.length){
      // pause then start deleting
      isDeleting = true
      clearTimeout(tickTimer)
      tickTimer = window.setTimeout(tick, 900)
      return
    }
  } else {
    // delete
    charIndex--
    text.value = current.slice(0, charIndex)
    if(charIndex <= 0){
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
    }
  }
  // typing speed: faster deleting
  const delay = isDeleting ? 40 : 100
  tickTimer = window.setTimeout(tick, delay)
}

onMounted(()=>{
  // boot sequence
  tickTimer = window.setTimeout(tick, 500)
  cursorTimer = window.setInterval(()=> cursorVisible.value = !cursorVisible.value, 520)
})

onBeforeUnmount(()=>{
  if(tickTimer) clearTimeout(tickTimer)
  if(cursorTimer) clearInterval(cursorTimer)
})
</script>

<template>
  <section class="hero container">
    <div class="hero-inner">
      <h2 aria-live="polite"><span class="typed">{{ text }}</span><span class="cursor" :class="{ hidden: !cursorVisible }">|</span></h2>
      <p class="lead">I build fast, accessible, and delightful web experiences.</p>
      <div class="ctas">
        <a href="#projects" class="btn">See Projects</a>
        <a href="mailto:you@example.com" class="btn ghost">Get in touch</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 4rem 0; }
.hero-inner { text-align: left; max-width: 900px; margin: 0 auto; }
.hero h2 { margin: 0 0 0.5rem; font-size: 2.6rem; font-weight:700; display:flex; align-items:center; gap:0.5rem; }
.typed { white-space: pre; min-width: 1ch; }
.cursor { display:inline-block; width:1ch; color:var(--accent); opacity:1; transition: opacity 160ms linear; }
.cursor.hidden { opacity:0 }
.lead { margin: 0 0 1.25rem; color: var(--muted); }
.ctas { display:flex; gap: 0.75rem; }
.btn { display:inline-block; padding:0.6rem 1rem; border-radius:8px; background:var(--accent); color:#fff; text-decoration:none; }
.btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.08); color:inherit; }
@media (prefers-reduced-motion: reduce) {
  .cursor { transition: none !important }
}
</style>
