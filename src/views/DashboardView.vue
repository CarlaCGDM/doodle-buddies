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
    
    <main class="main" :class="{ hide: showMenu || showCanvas }" @mouseenter="showHeader = !showHeader" @mouseleave="showHeader = !showHeader" ref="scrollContainer" @scroll="">
      <div class="post-list">
        <div v-for="(post,index) in posts" :key="index">
      
          <Post 
          :title="post.titulo"
          :id="index"
          :likes="post.favoritos.length"
          :imgSrc="`http://localhost:3001/${post.imagen}`"/>
          
        </div>
      </div>

      <div class="paginator">
        <button class="load-more" @click="previousPage">Prev</button>
        <p>{{page}}</p>
        <button class="load-more" @click="nextPage">Next</button>
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
      page: 1,
      isScrolling: false,
      posts: [
        /* your post data */
      ],
    };
  },
  mounted() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      axios.get(`http://localhost:3001/api/v1/publicaciones/page/${this.page}`).then((result) => {
      console.log(result.data);
      this.posts = result.data;
    })
    },
    nextPage() {
      this.page++;
      this.loadPosts();
    },
    previousPage() {
      this.page--;
      this.loadPosts();
      
    },
    updateCanvas() {
      this.showCanvas = !this.showCanvas;
      this.showHeader = !this.showHeader;
    },
    handleScroll() {
     
      console.log(this.isScrolling);

      const scrollContainer = this.$refs.scrollContainer;

      if (this.isScrolling) {
        setInterval(() => {
          this.isScrolling = false;
      }, 250);
      }

      if (!this.isScrolling) {
        if (scrollContainer.scrollHeight - Math.floor(scrollContainer.scrollTop) === scrollContainer.clientHeight) {
        this.nextPage();

        scrollContainer.scrollTop = 0;
        
        this.isScrolling = true;
      } else if (scrollContainer.scrollTop === 0) {
        
        //ir para arriba
        
      }

      console.log(scrollContainer.scrollHeight - Math.floor(scrollContainer.scrollTop));

      }
          
          

},
    getAuthorUsername(id) {
      axios.get(`http://localhost:3001/api/v1/usuarios/:id`).then((result) => {
      return result.data.nombreusu;
    })
    }
  },
};
</script>

<style>

.paginator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

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

.header.hide {
  transform: translateY(-12.5rem);
}

.toggle-menu {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
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
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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