<template>
  <div ref="backgroundContainer" class="background-3d-container">
    <div ref="mountPoint" class="background-3d-mount"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const backgroundContainer = ref<HTMLDivElement | null>(null)
const mountPoint = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let model: any = null
let animationMixer: THREE.AnimationMixer | null = null
let animationAction: THREE.AnimationAction | null = null
let frameId: number | null = null

const initScene = () => {
  if (!mountPoint.value) return

  // Create scene
  scene = new THREE.Scene()
  scene.background = null // Transparent background
  
  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 8)
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
  mountPoint.value.appendChild(renderer.domElement)
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight1.position.set(5, 5, 5)
  scene.add(directionalLight1)
  
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(-5, -5, -5)
  scene.add(directionalLight2)
  
  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  scene.add(hemisphereLight)
  
  // Load the GLTF model
  const loader = new GLTFLoader()
  loader.load(
    '/3dmodel/astronaut/scene.gltf',
    (gltf) => {
      model = gltf.scene
      // Position the model slightly off-center for visual interest
      model.position.set(0, -0.5, 0)
      scene?.add(model)
      
      // Handle animations if they exist
      if (gltf.animations && gltf.animations.length > 0) {
        animationMixer = new THREE.AnimationMixer(model)
        animationAction = animationMixer.clipAction(gltf.animations[0])
        animationAction.play()
      }
    },
    undefined,
    (error) => {
      console.error('Error loading astronaut model:', error)
    }
  )
  
  // Handle window resize
  window.addEventListener('resize', handleResize)
  
  // Start animation loop
  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  
  if (animationMixer) {
    const delta = 0.016 // Approximate delta time for 60fps
    animationMixer.update(delta)
  }
  
  // Note: Rotation is disabled as requested
  
  if (scene && camera && renderer) {
    renderer.render(scene, camera)
  }
}

const handleResize = () => {
  if (!mountPoint.value || !camera || !renderer) return
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  // Wait a bit to ensure DOM is ready
  setTimeout(initScene, 100)
})

onUnmounted(() => {
  // Clean up resources
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (mountPoint.value && renderer?.domElement) {
    mountPoint.value.removeChild(renderer.domElement)
  }
  
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.background-3d-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Behind all other content */
  pointer-events: none; /* Allow clicks to pass through */
}

.background-3d-mount {
  width: 100%;
  height: 100%;
}
</style>