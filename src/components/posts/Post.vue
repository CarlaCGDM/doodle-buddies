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
      <img :src="imgSrc" class="post-image"/>
      </router-link>

      <div class="post-footer">
        <span class="like-count" v-if="liked">{{ likes + 1 }} Likes</span>
        <span class="like-count" v-else>{{ likes }} Likes</span>
        <button @click="toggleLike" class="like-button" :class="{red : liked}">
          <font-awesome-icon icon="fa-solid fa-heart" size="lg" class=""/>
        </button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: ['title', 'id', 'imgSrc', 'likes', 'description'],
  data() {
    return {
      liked: false,
    }
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked
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
    width: 18vw;
  }

  .post-image:hover {
    transform: translateY(-5px);
  }
  
  .post-header {
    display: flex;
    flex-direction: column;
  }
  
  .post-title {
    height: 5vh;
    font-size: 1.3rem;
    font-weight: 300;
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
    aspect-ratio: 3/2;
    width: 100%;
    height: auto;
    border: 1px dotted #2C3E50;
    border-radius: 20px;
    background-color:rgb(163, 206, 206);
    transition: all 0.5s ease-in-out;
  }
  
  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.5rem 0rem 0.5rem;
  }

  .like-button {
    color: rgb(226, 226, 226);
    background-color: transparent;
    border: none;
  }

  .like-button.red {
    color: red;
  }

  </style>