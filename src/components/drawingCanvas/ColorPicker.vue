<template>
    <div>
      <div class="color-picker">
        <div
          v-for="color in colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="color-option"
          @click="updateBrushColor(color)"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        colors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"],
      };
    },
    methods: {
      updateBrushColor(color) {
        this.$emit("update:brushColor", color);
      },
    },
  };
  </script>
  
  <style>
  .color-picker {
    display: flex;
    flex-wrap: wrap;
    width: 100px;
  }
  
  .color-option {
    height: 30px;
    width: 30px;
    margin: 5px;
    border: 1px solid #333;
    border-radius: 50%;
    cursor: pointer;
  }
  </style>
  