<template>
  <div class="component-wrapper">
    <div ref="threeCanvasContainer" class="three-container"></div>

    <section 
      ref="revealSection" 
      class="about container reveal-effect"
      :class="{ 'is-visible': isVisible }"
    >
      <div class="about-grid">
        <div class="about-content">
          <div class="tag">// Backend Infrastructure</div>
          <h3>Half the Visual,<br/>Full the Logic.</h3>
          <p>
            I specialize in the parts of the system you don't see. 
            Scalable databases, optimized query layers, and robust API design.
          </p>
          
          <div class="contact">
            <p><a href="mailto:you@example.com">you@example.com</a></p>
          </div>
        </div>
        
        <div class="globe-space"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const isVisible = ref(false);
const revealSection = ref<HTMLElement | null>(null);
const threeCanvasContainer = ref<HTMLElement | null>(null);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let wireframeMesh: THREE.Mesh;
let animationFrameId: number;

const updateGlobePosition = () => {
  if (!wireframeMesh) return;
  
  const width = window.innerWidth;
  
  if (width <= 768) {
    // Mobile: Centered at the bottom, slightly cropped
    wireframeMesh.position.set(0, -2, 0);
    wireframeMesh.scale.set(0.7, 0.7, 0.7);
  } else {
    // Desktop: Pushed to the far right edge to show exactly "half"
    // We adjust X based on the perspective. ~4.5 is usually the "halfway" mark for a 3-unit radius at Z=5
    wireframeMesh.position.set(4.5, 0, 0);
    wireframeMesh.scale.set(1.2, 1.2, 1.2);
  }
};

const initThree = () => {
  if (!threeCanvasContainer.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance" 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeCanvasContainer.value.appendChild(renderer.domElement);

  // Geometry: Icosahedron (1 detail level for minimal wireframe)
  const geometry = new THREE.IcosahedronGeometry(3, 1); 

  // Material: Clean Blue
  const material = new THREE.MeshBasicMaterial({
    color: 0x61afef,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });

  wireframeMesh = new THREE.Mesh(geometry, material);
  scene.add(wireframeMesh);

  updateGlobePosition();

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    // Slow, technical rotation
    wireframeMesh.rotation.y += 0.001;
    wireframeMesh.rotation.x += 0.0005;
    
    renderer.render(scene, camera);
  };

  animate();
};

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateGlobePosition();
};

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) isVisible.value = true;
  }, { threshold: 0.1 });

  if (revealSection.value) observer.observe(revealSection.value);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrameId);
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
});
</script>

<style scoped>
.component-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #0b0e14;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
}

.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.about {
  position: relative;
  z-index: 1;
  padding: 0 10%;
  height: 100vh;
  display: flex;
  align-items: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 4rem;
}

.tag {
  color: #61afef;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.about-content h3 { 
  font-size: clamp(2.5rem, 6vw, 4rem); 
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.1;
}

.about-content p { 
  font-size: 1.1rem;
  color: #abb2bf;
  max-width: 450px;
  line-height: 1.7;
}

.contact { margin-top: 3rem; }
.contact a { 
  color: #fff; 
  text-decoration: none; 
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 2px solid #61afef;
}

.reveal-effect {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-effect.is-visible {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1024px) {
  .about-grid { gap: 2rem; }
}

@media (max-width: 768px) {
  .about-grid { 
    grid-template-columns: 1fr; 
    text-align: center;
  }
  .about-content { margin: 0 auto; }
  .globe-space { height: 200px; }
}
</style>