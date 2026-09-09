<template>
  <section class="hobbies container">
    <div class="hobbies-inner">
      <div class="hobbies-card">

        <h3>Hobbies</h3>
        <p>
          When I'm not at my desk, you'll usually find me <strong>drawing</strong>.
        </p>

        <div class="gallery-wrapper">
          <masonry-wall :items="myPhotos" :column-width="300" :gap="16">
            <template #default="{ item }">
              <div class="card">
                <img :src="item.src" :alt="item.alt" class="gallery-img" />
                <div v-if="item.title" class="card-content">
                  {{ item.title }}
                </div>
              </div>
            </template>
          </masonry-wall>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

const myPhotos = [
  { src: 'https://picsum.photos/400/600', alt: 'Sketch 1', title: 'Digital Portrait' },
  { src: 'https://picsum.photos/400/300', alt: 'Sketch 2', title: 'Landscape' },
  { src: 'https://picsum.photos/400/500', alt: 'Sketch 3', title: 'Character Study' },
  { src: 'https://picsum.photos/400/400', alt: 'Sketch 4', title: 'Still Life' },
];
</script>

<style scoped>
.hobbies {
  padding: 2rem 0;
}

.gallery-wrapper {
  margin-top: 2rem;
}

.card:hover {
  transform: translateY(-5px);
}

.gallery-img {
  width: 100%;
  display: block;
}

.card-content {
  padding: 10px 0 0;
  font-size: 0.9rem;
  color: #555;
}
</style>