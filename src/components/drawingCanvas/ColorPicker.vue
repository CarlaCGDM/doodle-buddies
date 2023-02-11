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
        colors: ["#f8b195", "#f67280", "#c06c84", "#6c5b7b", "#355c7d", 
         "#99B898", "#C5D86D", "#FECE44", "#FFA600", "#FF5733", 
         "#C8C8A9", "#83AF9B", "#ECE5CE", "#B3E8D2", "#81D4FA", 
         "#B48EAD", "#FDA7DF", "#F7E3E3", "#FFC1CC", "#C8E6C9"]


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
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  