<template>
    <div class="scroll-container">
      <div class="scroll-up" @click="scrollUp">Up</div>
      <div class="scroll-list">
        <transition-group name="slide-fade" tag="div">
          <div
            v-for="(square, index) in visibleSquares"
            :key="index"
            :style="{ backgroundColor: square }"
            class="scroll-item"
          >{{index}}</div>
        </transition-group>
      </div>
      <div class="scroll-down" @click="scrollDown">Down</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        squares: [
          "#FF69B4",
          "#7FFFD4",
          "#9370DB",
          "#00FF7F",
          "#FFD700",
          "#FFB6C1",
          "#87CEEB",
          "#FFA07A",
          "#BA55D3",
          "#90EE90",
          "#FFA500",
          "#FFC0CB",
          "#ADD8E6",
          "#F08080",
          "#EE82EE",
          "#98FB98",
          "#FFFF00",
          "#C71585",
          "#87CEFA",
          "#F0E68C"
        ],
        startIndex: 0,
        endIndex: 5
      };
    },
    computed: {
      visibleSquares() {
        return this.squares.slice(this.startIndex, this.endIndex);
      }
    },
    methods: {
      scrollUp() {
        if (this.startIndex > 0) {
          this.startIndex--;
          this.endIndex--;
        }
      },
      scrollDown() {
        if (this.endIndex < this.squares.length) {
          this.startIndex++;
          this.endIndex++;
        }
      }
    }
  };
  </script>
  
  <style>
  .scroll-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 500px;
    position: relative;
  }
  
  .scroll-up {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    border-radius: 25px;
    position: absolute;
    bottom: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scroll-down {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    border-radius: 25px;
    position: absolute;
    top: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .scroll-up {
    left: 0;
  }
  
  .scroll-down {
    right: 0;
  }
  
  .scroll-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  }
  
  .scroll-item {
    width: 100%;
    height: 100px;
    border-radius: 10px;
  }
  </style>  
  