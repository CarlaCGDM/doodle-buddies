<script setup>
import {useRoute} from "vue-router"
const route = useRoute()
</script>

<!--Aquí tengo que hacer la request a mi API para que me devuelva la info de un único producto con la ID que tengo-->

<template>
    <div class="about">
      <h1>{{route.params.id}}</h1>
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

  