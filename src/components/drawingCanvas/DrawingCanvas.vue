<script setup>
    import ColorPicker from "./ColorPicker.vue";
</script>

<template>
    <div class="new-drawing-form" enctype="multipart/form-data">
        <input class="newpost-title" type="text" placeholder="Title" />
        <div class="canvas"><canvas ref="canvas" width="1024" height="468" @mousedown="startDrawing" @mousemove="continueDrawing" @mouseup="stopDrawing"></canvas></div>
        <ColorPicker @update:brushColor="updateBrushColor"/>
        <!-- <textarea class="newpost-description" placeholder="Description" rows="20" cols="20"></textarea> -->
        <button class="save-button" @click="saveImage">Save Image</button>
    </div>
  </template>
  
  <script>
  import {fabric} from 'fabric';
  import axios from "axios";
  import FormData from "form-data";
  
  export default {
    data() {
      return {
        canvas: null,
        isDrawing: false,
        lastPointer: {},
      };
    },
    mounted() {
      this.canvas = new fabric.Canvas(this.$refs.canvas);
      this.startDrawing("#f67280");
    },
    methods: {
      updateBrushColor(e) {
        this.startDrawing(e);
        console.log("i updated with " + e.color);
      },
      startDrawing(brushColor) {
        this.isDrawing = true;
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = 5;
        this.canvas.freeDrawingBrush.color = brushColor;
        this.canvas.__corner = 'tl';
        this.canvas.renderAll();
      },
      continueDrawing(e) {
        if (!this.isDrawing) return;
        const pointer = this.canvas.getPointer(e.e);
        const points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.canvas.freeDrawingBrush._points.push(points);
        this.canvas.renderAll();
      },
      stopDrawing() {
        this.isDrawing = false;
        this.canvas.isDrawingMode = false;
      },
      saveImage() {
        
        const dataURL = this.canvas.toDataURL({
          format: 'jpeg',
          quality: 1,
        });

        const form = new FormData();
        form.append("image", dataURL);

        console.log(form);

        /* Aquí en lugar de bajarla al PC del usuario tengo que mandarla por POST al servidor */

        axios.post('http://localhost:3001/api/v1/save-image', form, {
          headers: {
            'Content-Type': '"multipart/form-data'
  },})
        .then(response => {
        console.log('Image saved successfully', response.data);
        })
        .catch(error => {
        console.error('Error saving image', error);
        });

        this.downloadImage(dataURL, 'doodle.jpeg');
      },
      downloadImage(dataURL, fileName) {
        const link = document.createElement('a');
        link.download = fileName;
link.href = dataURL;
link.click();
},
},
};
</script>

<style>

.new-drawing-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding-top: 1rem;
}

.color-picker {
  position:fixed;
  right: -7rem;
  top: 7.5rem;
}

.canvas {
  background-color: rgb(231, 231, 231);
  border-radius: 20px;
  padding: 20px;
  border: 3px dashed #000000;
}

.newpost-title {
  border: none;
  border-radius: 4px;
  background-color: transparent;
  padding: 5px;
  font-size: 18px;
  width: 100%;
}

.newpost-description {
  border: none;
  background-color: black;
  border-radius: 10px;
  padding: 5px;
  position: fixed;
  top: 7rem;
  left: -13rem;
}

.save-button {
  padding: 1rem;
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 15px;
}

</style>