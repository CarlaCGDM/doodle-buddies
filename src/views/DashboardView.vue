<script setup>
import NewPostButton from '../components/NewPostButton.vue'
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <button class="toggle-menu" @click="showMenu = !showMenu">
        ☰
      </button>
      <h1>DoodleBuddies</h1>
    </header>
    <aside class="sidebar" :class="{ show: showMenu }">
      <!-- your sidebar content goes here -->
    </aside>
    <main class="main" :class="{ hide: showMenu }">
      <div class="post-list">
        <div v-for="post in posts" :key="post.id">
          <div class="post">
            <router-link :to="{name: 'post', params: {id: post.id}}">
            <p>{{post.title}}</p>
            <div class="image"></div>
          </router-link>
          </div>
        </div>
        <button class="load-more" @click="loadMore">Load More</button>
      </div>
    </main>
  </div>
  <NewPostButton />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showMenu: false,
      posts: [
        /* your post data */
      ],
    };
  },
  mounted() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((result) => {
      console.log(result.data);
      this.posts = result.data;
    })
  },
  methods: {
    loadMore() {
      /* your load more logic */
    },
  },
};
</script>

<style>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: lightgray;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  top: 5rem;
  height: calc(100vh - 5rem);
  bottom: 0;
  left: 0;
  width: 300px;
  background-color: black;
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  z-index: 100;
  opacity: 0.95;
}

.sidebar.show {
  transform: translateX(0);
}

.main {
  flex: 1;
  overflow: auto;
  transition: opacity 0.3s ease-out;
  opacity: 1;
  margin-top: 4rem;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.main.hide {
  opacity: 0.3;
  pointer-events: none;
}

.post-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 1rem;
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