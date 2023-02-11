<script setup>
import DrawingCanvas from './drawingCanvas/DrawingCanvas.vue'
</script>

<template>
    <div>
      <DrawingCanvas class="square" v-if="showSquare" />
      <button id="toggle-square" @click="toggleSquare">+</button>
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
    top: 2rem;
    left: 2rem;
    width: 4rem;
    height: 4rem;
    border-radius: 20px;
    background-color: black;
    color: white;
    transition: all 0.3s ease-in-out;
    font-size: 2rem;
    border-width: 0px;
  }

  #toggle-square:hover {
    transform: translateY(10px);
    background-color: blueviolet;
    font-size: 3rem;
    cursor: pointer;
  }
  
  .square {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 75vh;
    background-color: rgb(117, 117, 117);
    border-radius: 20px;
    padding: 20px;
  }
  </style>