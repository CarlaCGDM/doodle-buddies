<script setup>
import NewPostButton from '../components/NewPostButton.vue'
import Post from '../components/posts/Post.vue'
</script>

<template>
  <div class="dashboard">
    <header class="header" :class="{ hide: !showHeader }">
      <h1 class="title">DoodleBuddies</h1>
      <p>Make art with thousands of friends!</p>
    </header>
    <!-- <aside class="sidebar" :class="{ show: showMenu }" @mouseenter="showMenu = !showMenu" @mouseleave="showMenu = !showMenu">

      <div class="sidebar-content">

      <div class="circle"></div>
      <p>@_testuser1</p>
      <button><RouterLink to="/profile">Your Profile</RouterLink></button>
      <button>Logout</button>

      </div>

    </aside> -->
    <main class="main" :class="{ hide: showMenu || showCanvas }" @mouseenter="showHeader = !showHeader" @mouseleave="showHeader = !showHeader">
      <div class="post-list">
        <div v-for="(post,index) in posts" :key="index">
      
          <Post 
          :title="post.titulo"
          :id="index"
          :likes="post.favoritos.length"
          :imgSrc="post.imagen"/>
          
        </div>
        <button class="load-more" @click="loadMore">Load More</button>
      </div>
    </main>
  </div>
  <NewPostButton @update:showCanvas="updateCanvas" />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showMenu: false,
      showCanvas: false,
      showHeader: true,
      posts: [
        /* your post data */
      ],
    };
  },
  mounted() {
    axios.get("http://localhost:3001/api/v1/publicaciones").then((result) => {
      console.log(result.data);
      this.posts = result.data;
    })
  },
  methods: {
    loadMore() {
      /* your load more logic */
    },
    updateCanvas() {
      this.showCanvas = !this.showCanvas;
      this.showHeader = !this.showHeader;
    },
    getImage(id) {
      axios.get(`http://localhost:3001/api/v1/imagenes/${id}`).then((result) => {
      console.log(result);
      return result.data;
    })
    }
  },
};
</script>

<style>
.title {
  font-size: 5rem;
}

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 20rem;
  transition: all 0.3s ease-in-out;
  gap: 3rem;
  
}

.toggle-menu {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.sidebar {
  position: fixed;
  width: 20vw;
  left: 0;
  bottom: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  transform: translateX(-90%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.sidebar-content {
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  border-radius: 10px;
  padding-top: 20%;
}

  .sidebar .circle {
    width: 10vw;
    height: 10vw;
    border-radius: 100%;
    background-color: #5dade2;
  }

  .sidebar button {
    width: 150px;
    height: 50px;
    margin-top: 30px;
    border: none;
    border-radius: 25px;
    background-color: #5dade2;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

.sidebar.show {
  transform: translateX(0);
}

.header.hide {
  transform: translateY(-12.5rem);
}

.main {
  flex: 1;
  overflow: auto;
  transition: opacity 0.3s ease-out;
  opacity: 1;
  margin-top: 20rem;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  transition: all 0.3s ease-in-out;
  width: 100vw;
}

.main:hover {
  margin-top: 7.5rem;
}

.main.hide {
  opacity: 0.3;
  filter: saturate(0);
  pointer-events: none;
}

.post-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 1rem;
  gap: 20px;
}

.post-list .post {
  width: 300px;
  margin: 1rem;
  height: auto;
}

.post-list .post .image {
    background-color: blueviolet;
    height: 10rem;
}

.post-list p {
  text-align: center;
  margin-top: 0.5rem;
  height: 4rem;
}

.load-more {
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

 /* Media query for mobile */
 @media only screen and (max-width: 768px) {
    .header button {
      display: none;
    }

    .header {
      font-size: 20px;
    }

    .sidebar {
      position: fixed;
      top: 5em;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 10vh;
      background-color: black;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }
  }

</style>