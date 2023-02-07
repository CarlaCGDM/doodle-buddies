<script setup>
import DrawingCanvas from './drawingCanvas/DrawingCanvas.vue'
</script>

<template>
    <div>
      <div id="square" v-if="showSquare">
        <h2>Make new post</h2>
        <DrawingCanvas />
    </div>
      <button id="toggle-square" @click="toggleSquare">Toggle Square</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showSquare: false,
      };
    },
    methods: {
      toggleSquare() {
        this.showSquare = !this.showSquare;
      },
    },
  };
  </script>
  
  <style>
  #toggle-square {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
  #square {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 75vh;
    background-color: lightblue;
  }
  </style>