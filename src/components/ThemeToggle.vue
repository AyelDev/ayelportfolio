<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
const isChecked = ref(false)

/**
 * Updates the DOM and LocalStorage
 */
function applyTheme(t: 'light' | 'dark') {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(t)
  try {
    localStorage.setItem('theme', t)
  } catch (e) { 
    /* Handle storage blocked (e.g. private mode) */ 
  }
  theme.value = t
}

/**
 * Handles the visual transition orchestration
 */
function toggle() {
  const next = theme.value === 'dark' ? 'light' : 'dark'

  // Add a class to the root to handle cross-fade transitions in global CSS if desired
  document.documentElement.classList.add('theme-transition')

  // Delay the actual variable swap to let the knob start moving first
  // 150ms is a sweet spot for "mid-animation" swaps
  setTimeout(() => {
    applyTheme(next)
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 300)
  }, 150)
}

function onCheckboxChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  isChecked.value = checked
  toggle()
}

onMounted(() => {
  const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
  
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    applyTheme(prefersLight ? 'light' : 'dark')
  }
  
  // Sync checkbox state with the theme determined above
  isChecked.value = theme.value === 'dark'
})

// Keep the checkbox in sync if the theme is changed from elsewhere
watch(theme, (val) => { 
  isChecked.value = val === 'dark' 
})
</script>

<template>
  <label class="toggle-label">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="isChecked"
      @change="onCheckboxChange"
      aria-label="Toggle dark mode"
    />
    <div class="toggle-track" :class="{ 'checked': isChecked }" aria-hidden="true">
      <div class="toggle-knob"></div>
    </div>
  </label>
</template>

<style scoped>
/* Container Positioning */
.toggle-label { 
  position: fixed; 
  top: 1rem; 
  right: 1rem; 
  z-index: 9999; 
  display: inline-flex; 
  align-items: center; 
  gap: 0.75rem; 
  padding: 0.25rem; 
  cursor: pointer;
}

/* Screen-reader only utility */
.sr-only { 
  position: absolute; 
  width: 1px; 
  height: 1px; 
  padding: 0; 
  margin: -1px; 
  overflow: hidden; 
  clip: rect(0,0,0,0); 
  white-space: nowrap; 
  border: 0; 
}

/* Track styling */
.toggle-track {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 9999px;
  background: rgba(0,0,0,0.15);
  transition: background-color 320ms cubic-bezier(.4, 0, .2, 1), box-shadow 320ms ease;
  display: inline-flex;
  align-items: center;
  padding: 3px;
}

.toggle-track.checked { 
  background: linear-gradient(90deg, #2563eb, #7c3aed); 
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); 
}

/* Knob styling */
.toggle-knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(0);
  transition: transform 400ms cubic-bezier(.22, 1, .36, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  will-change: transform;
}

.toggle-track.checked .toggle-knob {
  transform: translateX(24px);
}

/* Label text */
.toggle-text { 
  font-size: 0.875rem; 
  font-weight: 500;
  color: #666; /* Fallback if --muted variable is missing */
  user-select: none; 
}

/* Accessibility: Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  .toggle-track, .toggle-knob { 
    transition: none !important; 
  }
}
</style>