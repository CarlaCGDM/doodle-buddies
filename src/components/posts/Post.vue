<template>
    <div class="post-container">
      <div class="post-header">
        <!-- <div class="post-controls">
          <button @click="editPost">Edit</button>
          <button @click="deletePost">Delete</button>
        </div> -->
          <h2 class="post-title">{{ cutTitle(title) }}</h2>
      </div>

      <router-link :to="{name: 'post', params: {id: id}}">
      <img :src="image" class="post-image"/>
    </router-link>

      <div class="post-footer">
        <span class="like-count">{{ likes }} Likes</span>
        <button @click="toggleLike">
          <template v-if="liked">Unlike</template>
          <template v-else>Like</template>
        </button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: ['title', 'id', 'imgSrc', 'description'],
  data() {
    return {
      likes: 0,
      liked: false
    }
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked
      if (this.liked) {
        this.likes++
      } else {
        this.likes--
      }
    },
    cutTitle(title) {
        return title.length > 30 ? title.slice(0, 30) + '...' : title;
    }
  }
}
</script>
  
  <style scoped>
  .post-container {
    
    overflow: hidden;
    margin-bottom: 20px;
    width: 20vw;
  }

  .post-image:hover {
    transform: translateY(5px);
  }
  
  .post-header {
    display: flex;
    flex-direction: column;
  }
  
  .post-title {
    height: 5vh;
    font-size: 16px;
    font-weight: 600;
    margin-left: 0.5rem;
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
    width: 100%;
    border: 2px solid #2C3E50;
    border-radius: 20px;
    height: 25vh;
    background-color:rgb(163, 206, 206);
    transition: all 0.5s ease-in-out;
  }

  
  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  </style>