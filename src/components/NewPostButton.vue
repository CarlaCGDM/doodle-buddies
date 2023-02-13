<script setup>
import DrawingCanvas from './drawingCanvas/DrawingCanvas.vue'
</script>

<template>
    <div>
      <DrawingCanvas class="square" v-if="showSquare" />
      <button id="toggle-square" @click="toggleSquare"><p :class="{rotate: showSquare}" class="mas" >+</p></button>
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
        this.$emit("update:showCanvas", true);
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
    font-size: 2rem;
    border-radius: 20px;
    background-color: black;
    color: white;
    transition: all 0.3s ease-in-out;
    border-width: 0px;
  }

  .mas {
    transition: all 0.3s ease-in-out;
  }

  .mas.rotate {
    transform: rotate(45deg);
    
  }

  #toggle-square:hover {
    transform: translateY(10px);
    background-color: blueviolet;
    font-size: 3.25rem;
    cursor: pointer;
  }
  
  .square {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
  }
  </style>