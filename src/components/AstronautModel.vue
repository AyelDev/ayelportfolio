<template>
  <div class="astronaut-container">
    <div ref="mountPoint" class="astronaut-model"></div>
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

  // 1. Scene Setup
  scene = new THREE.Scene()
  scene.background = null // Keeps background transparent

  // 2. Camera Setup
  camera = new THREE.PerspectiveCamera(
    100,
    mountPoint.value.clientWidth / mountPoint.value.clientHeight,
    2,
    1000
  )
  camera.position.set(0, -20, 46)

  // 3. Renderer Setup (Critical for Colors)
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance" 
  })
  renderer.setSize(mountPoint.value.clientWidth, mountPoint.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // These settings ensure the colors match modern GLTF standards
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.5 // Increase exposure for brightness
  
  mountPoint.value.appendChild(renderer.domElement)

  // 4. Lighting (Simulating the studio look in your image)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  // Key Light (Front Right - Warm/White)
  const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
  mainLight.position.set(5, 5, 5)
  scene.add(mainLight)

  // Rim Light (Back Left - Creates the highlight on the edges)
  const rimLight = new THREE.DirectionalLight(0xffffff, 3.5)
  rimLight.position.set(-5, 5, -5)
  scene.add(rimLight)

  // 5. Environment Map (Needed for the shiny gold visor/helmet)
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  scene.environment = pmremGenerator.fromScene(new THREE.Scene()).texture

  // 6. Loader Setup
  const loader = new GLTFLoader()

  loader.load(
    '/3dmodel/flying_tower/scene.gltf',
    (gltf) => {
      model = gltf.scene
      model.scale.set(2, 2, 2)
      model.position.set(0, -1.5, 0)
      
      // Fix Material Colors and Reflections
      model.traverse((child: any) => {
        if (child.isMesh) {
          // Force sRGB on textures if they look washed out
          if (child.material.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace
          }
          
          // Adjust physical properties to match the photo
          if (child.material) {
            child.material.needsUpdate = true
            // If the suit is black/dark, it's usually too much metalness without a skybox
            if (child.material.metalness > 0) {
                child.material.metalness = 0.4 
                child.material.roughness = 0.2 // Lower roughness = shinier helmet
            }
          }
        }
      })
      
      scene?.add(model)
      
      if (gltf.animations && gltf.animations.length > 0) {
        animationMixer = new THREE.AnimationMixer(model)
        const action = animationMixer.clipAction(gltf.animations[0])
        action.play()
      }
    },
    undefined,
    (error) => console.error('Error loading model:', error)
  )

  window.addEventListener('resize', handleResize)
  animate()
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  
  if (animationMixer) {
    animationMixer.update(0.016)
  }
  
  if (scene && camera && renderer) {
    renderer.render(scene, camera)
  }
}

const handleResize = () => {
  if (!mountPoint.value || !camera || !renderer) return
  const width = mountPoint.value.clientWidth
  const height = mountPoint.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
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
.astronaut-container {
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  overflow: hidden;
  background: transparent;
}

.astronaut-model {
  width: 100%;
  height: 100%;
}
</style>