<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref<'light' | 'dark'>('dark')

function applyTheme(t: 'light' | 'dark'){
  document.documentElement.classList.remove('light','dark')
  document.documentElement.classList.add(t)
  try{ localStorage.setItem('theme', t) }catch(e){}
  theme.value = t
}

function toggle(){ applyTheme(theme.value === 'dark' ? 'light' : 'dark') }

onMounted(()=>{
  try{
    const stored = localStorage.getItem('theme') as ('light'|'dark'|null)
    if(stored === 'light' || stored === 'dark') { applyTheme(stored); return }
  }catch(e){}
  const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  applyTheme(prefers as 'light'|'dark')
})
</script>

<script lang="ts">
// Add a small helper for the transition overlay when changing theme.
// The overlay logic is implemented in the `toggle` handler below via DOM classes.
</script>

<template>
  <button
    class="theme-switch"
    @click="() => {
      const next = theme.value === 'dark' ? 'light' : 'dark'
      // show overlay
      document.documentElement.classList.add('theme-transition')
      // allow paint, then swap theme and hide overlay (triggers fade)
      setTimeout(() => {
        applyTheme(next)
        setTimeout(() => document.documentElement.classList.remove('theme-transition'), 20)
      }, 60)
    }"
    :aria-pressed="theme === 'dark'"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
    <span class="switch-track" aria-hidden>
      <span class="switch-thumb" :class="{ on: theme === 'light' }"></span>
    </span>
  </button>
</template>
</script>

<template>
  <button
    class="theme-switch"
    @click="toggle"
    :aria-pressed="theme === 'dark'"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
    <span class="switch-track" aria-hidden>
      <span class="switch-thumb" :class="{ on: theme === 'light' }"></span>
    </span>
  </button>
</template>

<style scoped>
.theme-switch{
  background: transparent;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.switch-track{
  width: 44px;
  height: 26px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  position: relative;
  display: inline-block;
  transition: background-color 240ms ease;
}
.switch-thumb{
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: transform 240ms cubic-bezier(.2,.9,.2,1), background-color 240ms ease;
}
.switch-thumb.on{
  transform: translateX(18px);
  background: var(--accent);
}

/* adapt track color based on current CSS variables */
html.light .switch-track{ background: rgba(16,16,16,0.06); }
html.dark .switch-track{ background: rgba(255,255,255,0.06); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-thumb { transition: none !important; }
}
</style>
