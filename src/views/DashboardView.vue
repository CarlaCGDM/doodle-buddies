<script setup>
import NewPostButton from '../components/NewPostButton.vue'
import Post from '../components/posts/Post.vue'
import APIRoot from '../router/APIRoot'
import NavBar from '../components/NavBar.vue';

</script>

<template>
  <div class="dashboard">

    <header class="header" :class="{hide: showCanvas}">
      <h1 class="title">DoodleBuddies</h1>
      <p>Make art with thousands of friends!</p>
    </header>
    
    <main class="main" :class="{ hide: showCanvas}" @wheel="handleScroll">
        <div v-for="post in posts" :key="post[0]">
      
          <Post 
          :title="post[1].titulo"
          :id="post[0]"
          :likes="post[1].favoritos.length"
          :imgSrc="`${APIRoot}/${post[1].imagen}`"
          :author="'creatorUsername'"/>
          
      </div>
    </main>

  </div>
  
  <div class="paginator" :class="{ hide: showCanvas }">
    <button class="paginator-button" @click="previousPage"><font-awesome-icon icon="fa-solid fa-arrow-up" /></button>
      <p>{{page}}</p>
    <button class="paginator-button" @click="nextPage"><font-awesome-icon icon="fa-solid fa-arrow-down" /></button>
  </div>

  <NewPostButton @update:showCanvas="updateCanvas" />

  <NavBar />

</template>

<script>
import axios from "axios";
import { nextTick } from 'vue';
export default {
  data() {
    return {
      showCanvas: false,
      isScrolling: false,
      page: 1,
      posts: [],
    };
  },
  mounted() {

    // Nada más cargar, se pide la primera página de publicaciones al servidor
    console.log("Estás en Dashboard. Las peticiones se realizan a: " + APIRoot);
    this.loadPosts();
    console.log(this.$posts);

  },
  methods: {

    loadPosts() {


      // Realizamos petición
      console.log(`Realizando petición de página de publicaciones ${this.page} al servidor.`); 
      axios
        .get(`${APIRoot}/api/v1/publicaciones/pagina/${this.page}`)
        .then((result) => {

          // Recibimos datos

          console.log(result.data);
          console.log("hay publicaciones");
          this.posts = result.data;

        })
        .catch( error => { this.page--; } );
  },

    nextPage() {

      this.page++;
      this.loadPosts();

    },

    previousPage() {
      
      if (this.page > 1) {
      this.page--;
      this.loadPosts();
      }
      
    },

    updateCanvas() {

      this.showCanvas = !this.showCanvas;
      this.page = 1;
      this.loadPosts();

    },

    handleScroll(e) {

      if (!this.isScrolling) {

        //Límite de un cambio cada 0.5 segundos
        console.log("Desactivando el scroll durante los próximos 0.5 segundos.");
        this.isScrolling = true;
        
        if (e.deltaY > 0) {
          
          
          //animacion de ir hacia arriba y desvanecerse
          
          //animacion de aparecer desde abajo, con setTimeout

        this.nextPage();
        
      } else { 
        
        this.previousPage(); 
      
      }

      //Volver a habilitar el scroll pasados los 0.5 segundos
      setTimeout(() => {
        console.log("El scroll vuelve a estar permitido.");
        this.isScrolling = false;
      }, "500")

      }

},
    getAuthorUsername(id) {
      axios.get(`${APIRoot}/api/v1/usuarios/usuario/${id}`).then((result) => {
        
      console.log(result.data.nombreusu);
      return result.data.nombreusu;
    })
    }
  },
};
</script>

<style>

.dashboard {
  display:flex;
  flex-direction: column;
}

.paginator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: all 0.3s;
  padding: 1.5rem;
}

.paginator.hide {
  opacity: 0.1;
}

.paginator-button {
  margin: 1rem;
  height: 2rem;
  width: 2rem;
  border: none;
  cursor: pointer;
  color: white;
  background-color: black;
  border-radius: 50%;
}

.title {
  font-size: 3rem;
}

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  justify-items: center;
  
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 15vh;
  transition: all 0.3s ease-in-out;
  gap: 0.5rem;
  
}

.header.hide {
  opacity: 0.1;
}

.toggle-menu {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
}


.main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 85vh;
  width: 100%;
  
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  
  padding: 3rem 8rem;
}

.main.hide {
  opacity: 0.1;
  filter: saturate(0);
  pointer-events: none;
}

 /* Media query for mobile */
 @media (max-width: 768px) {

    .title {
      font-size: 2rem;
    }

    .main {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      height: 80vh;
      padding: 0;
    }

    .header {
      height: 20vh;
    }

    .paginator {
      display: none;
    }
  }

</style>