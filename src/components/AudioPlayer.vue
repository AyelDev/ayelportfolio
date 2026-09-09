<template>
  <div v-if="showWelcome" class="welcome-overlay" @click="startPlaying">
    <div class="welcome-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" class="welcome-icon">
        <path :d="mdiVolumeHigh" />
      </svg>
      <p class="welcome-text">Click to play!</p>
    </div>
  </div>

  <button v-if="!showWelcome" @click="toggle" class="audio-btn" :aria-label="isPlaying ? 'Pause music' : 'Play music'">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path :d="isPlaying ? mdiVolumeHigh : mdiVolumeOff" />
    </svg>
  </button>

  <audio ref="audioEl" :src="`${publicPath}audio/alex-morgan-fantasy-adventure-quest-537478.mp3`" loop muted />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mdiVolumeHigh, mdiVolumeOff } from '@mdi/js'

const audioEl = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(localStorage.getItem('audio-playing') !== 'false')
const showWelcome = ref(localStorage.getItem('audio-clicked') !== 'true')
const publicPath = import.meta.env.BASE_URL

onMounted(() => {
  const audio = audioEl.value
  if (!audio) return

  audio.volume = 0.5

  if (!showWelcome.value && isPlaying.value) {
    audio.muted = false
    audio.play().catch(() => {
      audio.muted = true
      showWelcome.value = true
      localStorage.removeItem('audio-clicked')
    })
  }

  const unmute = () => {
    if (isPlaying.value && audio.muted) {
      audio.muted = false
    }
    document.removeEventListener('click', unmute)
  }
  document.addEventListener('click', unmute)
})

function startPlaying() {
  const audio = audioEl.value
  if (!audio) return

  audio.muted = false
  audio.play().catch(() => {
    audio.muted = true
    showWelcome.value = true
    localStorage.removeItem('audio-clicked')
  })
  isPlaying.value = true
  showWelcome.value = false
  localStorage.setItem('audio-clicked', 'true')
  localStorage.setItem('audio-playing', 'true')
}

function toggle() {
  const audio = audioEl.value
  if (!audio) return

  if (audio.paused) {
    audio.muted = false
    audio.play().catch(() => {
      audio.muted = true
      showWelcome.value = true
      localStorage.removeItem('audio-clicked')
    })
    isPlaying.value = true
  } else {
    audio.pause()
    isPlaying.value = false
  }
  localStorage.setItem('audio-playing', String(isPlaying.value))
}
</script>

<style scoped>
/* Welcome Overlay */
.welcome-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(15, 15, 16, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 4rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.welcome-content:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.12);
}

.welcome-icon {
  color: var(--accent);
}

.welcome-text {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
}

/* Play/Pause Button */
.audio-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  padding: 0;
  border: none;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  color: #333;
  cursor: pointer;
  transition: all 0.25s ease;
}

.audio-btn:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .welcome-content {
    padding: 2rem 2.5rem;
    margin: 1rem;
  }

  .welcome-text {
    font-size: 1.1rem;
  }

  .audio-btn {
    width: 36px;
    height: 36px;
  }
}
</style>
