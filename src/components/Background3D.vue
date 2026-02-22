<template>
  <div class="flyingtower-container">
    <div ref="mountPoint" class="flyingtower-model"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const mountPoint = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let model: THREE.Group | null = null
let animationMixer: THREE.AnimationMixer | null = null
let frameId: number | null = null

const initScene = () => {
  if (!mountPoint.value) return

  scene = new THREE.Scene()
  scene.background = null 

  const width = window.innerWidth
  const height = window.innerHeight
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(-9, 0, 10) 
  camera.lookAt(0, 5.5, 10)

  // 3. Renderer Setup
  renderer = new THREE.WebGLRenderer({
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance" 
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  
  mountPoint.value.appendChild(renderer.domElement)

  // 4. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 2)
  mainLight.position.set(5, 10, 7.5)
  scene.add(mainLight)

  // 5. Loader
  const loader = new GLTFLoader()
  loader.load(
    '/3dmodel/airship/scene.gltf',
    (gltf) => {
      model = gltf.scene
      model.scale.set(1.5, 1.5, 1.5)
      model.position.set(0, -2, 0)
      
      model.traverse((child: any) => {
        if (child.isMesh) {
          if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace
          child.material.metalness = 0.3
          child.material.roughness = 0.4
        }
      })
      
      scene?.add(model)
      
      if (gltf.animations && gltf.animations.length > 0) {
        animationMixer = new THREE.AnimationMixer(model)
        animationMixer.clipAction(gltf.animations[0]).play()
      }
    },
    undefined,
    (err) => console.error('Model failed to load:', err)
  )

  window.addEventListener('resize', handleResize)
  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  if (animationMixer) animationMixer.update(0.016)
  if (model) model.rotation.y += 0.002 // Subtle rotation for background effect
  if (scene && camera && renderer) renderer.render(scene, camera)
}

const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  setTimeout(initScene, 100)
})

onUnmounted(() => {
  if (frameId) cancelAnimationFrame(frameId)
  if (renderer) renderer.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.flyingtower-container {
  /* This pins the background to the screen */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Pushes it behind all other HTML elements */
  pointer-events: none; /* Allows you to click buttons through the background */
  overflow: hidden;
  background: transparent;
}

.flyingtower-model {
  width: 100%;
  height: 100%;
}
</style>