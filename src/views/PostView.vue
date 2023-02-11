<script setup>
import {useRoute} from "vue-router"
import PostDetail from "../components/posts/PostDetail.vue"
import EditHistory from "../components/posts/EditHistory.vue"
const route = useRoute()
</script>

<!--Aquí tengo que hacer la request a mi API para que me devuelva la info de un único producto con la ID que tengo-->

<template>
    <div class="about">
      <PostDetail :title="route.params.id"/>
      <EditHistory/>
    </div>
</template>
  
<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>

  