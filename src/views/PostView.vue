<script setup>
import {useRoute} from "vue-router"
import PostDetail from "../components/posts/PostDetail.vue"
import EditHistory from "../components/posts/EditHistory.vue"
import axios from "axios";
import APIRoot from "../router/APIRoot";
const route = useRoute()
</script>

<!--Aquí tengo que hacer la request a mi API para que me devuelva la info de un único producto con la ID que tengo-->

<template>
    <main v-if="hasPostData" class="post-detail-container">
      <PostDetail 
      :title="postData.titulo"
      :description="postData.descripcion"
      :likes="postData.favoritos.length"
      :imgSrc="`${APIRoot}/${postData.imagen}`"/>
      <EditHistory/>
    </main>
</template>

<script>
export default {
  data() {
    return {
      hasPostData: false,
      postData: {}
    };
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      axios.get(`${APIRoot}/api/v1/publicaciones/publicacion/${this.$route.params.id}`).then((result) => {
      console.log(result.data);
      this.postData = result.data;
      this.hasPostData = true;
      
    })
  }
}
};
</script>
  
<style>
  .post-detail-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
  }
</style>

  