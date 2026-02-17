<template id="hero">
  <section class="hero">
    <div class="hero-content">
      
      <div class="text-section">
        <div class="editor-window">
          <div class="code-row">
          </div>

          <div class="code-row indent">
            <p class="code-line">
              System<span class="white">.</span><span class="red">out</span><span class="white">.</span><span
                class="blue">println</span>("
            </p>
            <div class="string-window">
              <div class="string-track">
                <h1 class="greeting en">Welcome</h1>
                <h1 class="greeting es">Bienvenue</h1>
                <h1 class="greeting de">Willkommen</h1>
                <h1 class="greeting it">Benvenuto</h1>
                <h1 class="greeting en">Welcome</h1>
              </div>
            </div>
            <p class="code-line">");</p>
          </div>
        </div>
      </div>
       
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed as the animation is handled by CSS for performance
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');

/* 1. THE MAIN CONTAINER: Perfect Centering */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
}

.text-section {
  max-width: 800px;
  width: 100%;
}

.center_me {
  /* background: #282c34; */
  display: flex;
  justify-content: center;
  /* Horizontal center */
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'JetBrains Mono', monospace;
  overflow: hidden;
  box-sizing: border-box;
}

/* 2. THE EDITOR WINDOW: Keeps code lines left-aligned */
.editor-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.code-row {
  display: flex;
  align-items: baseline;
}

.indent {
  margin-left: 0;
  /* Removed indentation to center content */
}

.code-line {
  font-size: 6vmin;
  margin: 0;
  color: #e4bb68;
  /* Method color */
  line-height: 1.2;
}

/* Syntax Highlighting Colors */
.white {
  color: #abb2bf;
}

.red {
  color: #e06c75;
}

.blue {
  color: #61afef;
}

/* 3. THE TICKER LOGIC */
.string-window {
  height: 6vmin;
  /* Matches the line-height/size of greetings */
  overflow: hidden;
}

.string-track {
  display: flex;
  flex-direction: column;
  /* 10 second loop using a smooth cubic-bezier snap */
  animation: scroll-up 10s cubic-bezier(0.76, 0, 0.24, 1) infinite;
  will-change: transform;
}

.greeting {
  font-size: 6vmin;
  line-height: 6vmin;
  margin: 0;
  height: 6vmin;
  font-weight: 500;
  white-space: nowrap;
}

/* Language Specific Colors */
.en {
  color: #98c379;
}

/* Greenish string color */
.es {
  color: #fa8231;
}

.de {
  color: #c678dd;
}

.it {
  color: #56b6c2;
}

/* 4. ANIMATION KEYFRAMES 
   Calculated based on the height of one greeting (6vmin)
*/
@keyframes scroll-up {

  0%,
  15% {
    transform: translateY(0);
  }

  20%,
  35% {
    transform: translateY(-6vmin);
  }

  40%,
  55% {
    transform: translateY(-12vmin);
  }

  60%,
  75% {
    transform: translateY(-18vmin);
  }

  80%,
  100% {
    transform: translateY(-24vmin);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .string-track {
    animation: none;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .editor-window {
    align-items: center;
  }
  
  .indent {
    margin-left: 0;
    justify-content: center;
  }
}
</style>