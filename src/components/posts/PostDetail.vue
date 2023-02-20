<template>
  <div class="post-container">
    <div class="post-detail-header">
      <!-- <div class="post-controls">
        <button @click="editPost">Edit</button>
        <button @click="deletePost">Delete</button>
      </div> -->
      <button @click="toggleLike" class="like-button" :class="{red : liked}">
        <font-awesome-icon icon="fa-solid fa-heart" size="5x" class=""/>
      </button>
      <div class="post-header-info">
        <h2 class="post-detail-title">{{ title }}</h2>
        <p>@{{ author }}</p>
      </div>
    </div>

    <img :src="imgSrc" class="post-image"/>
    <p class="post-description">{{ description }}</p>

    <div class="post-detail-footer">
      <span class="like-count" v-if="liked">{{ likes + 1 }} Likes</span>
      <span class="like-count" v-else>{{ likes }} Likes</span>
    </div>
  </div>
</template>

<script>
export default {
props: ['title', 'id', 'imgSrc', 'likes', 'description','author'],
data() {
  return {
    liked: false,
  }
},
methods: {
  toggleLike() {
    this.liked = !this.liked
  },
}
}
</script>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  width: 60vw;
  gap: 1rem;
}

.post-header-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.post-image:hover {
  transform: translateY(-5px);
}

.post-detail-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}

.post-detail-title {
  height: 5vh;
  font-size: 2rem;
  font-weight: 300;
}

.post-description {
  font-size: 1.5rem;
}

.post-controls {
  display: flex;
}

.post-controls button {
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
}

.post-controls button:hover {
  background: #ddd;
}

.post-image {
  aspect-ratio: 3/2;
  width: 100%;
  height: auto;
  border: 1px dotted #2C3E50;
  border-radius: 20px;
  background-color:rgb(163, 206, 206);
  transition: all 0.5s ease-in-out;
}

.post-detail-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.like-button {
  color: rgb(226, 226, 226);
  background-color: transparent;
  border: none;
}

.like-count {
  font-size: 1.3rem;
}

.like-button.red {
  color: red;
}

/* Media query for mobile */
@media (max-width: 768px) {

.post-container {
width: 80vw;
}

.post-detail-title {
font-size: 1rem;
}

}

</style>
  