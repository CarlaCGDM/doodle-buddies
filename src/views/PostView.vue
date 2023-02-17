<script setup>
import {useRoute} from "vue-router"
import PostDetail from "../components/posts/PostDetail.vue"
import EditHistory from "../components/posts/EditHistory.vue"
import { Axios } from "axios";
const route = useRoute()
</script>

<!--Aquí tengo que hacer la request a mi API para que me devuelva la info de un único producto con la ID que tengo-->

<template>
    <div class="about">
      <PostDetail :title="route.params.id"/>
      <p>{data.titulo}</p>
      <EditHistory/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      data: {}
    };
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      Axios.get(`http://localhost:3001/api/v1/publicaciones/${this.route.params.id}`).then((result) => {
      console.log(result.data);
      this.data = result.data;

      // si no hay posts mostrar mensaje de que no hay mas posts !! 
      
    })

  }
}
};
</script>
  
<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>

  