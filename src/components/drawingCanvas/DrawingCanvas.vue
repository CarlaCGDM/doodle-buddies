<script setup>
    import ColorPicker from "./ColorPicker.vue";
    import LoggedUserId from '../../router/LoggedUser';
    import APIRoot from "../../router/APIRoot";
</script>

<template>
    <div class="new-drawing-form" enctype="multipart/form-data">
      <div class="text-input-fields">
        <input class="newpost-title" type="text" v-model="title" placeholder="Title" />
        <textarea class="newpost-description" v-model="description" cols="10" rows="10" placeholder="Description"></textarea>
        <button class="save-button" @click="saveImage">Save Image</button>
        <ColorPicker @update:brushColor="updateBrushColor"/>
      </div>
        
        <div class="canvas"><canvas ref="canvas" width="600" height="600" @mousedown="startDrawing" @mousemove="continueDrawing" @mouseup="stopDrawing"></canvas></div>
        <!-- <textarea class="newpost-description" placeholder="Description" rows="20" cols="20"></textarea> -->
        
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
        title: '',
        description: '',
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

        const formData = {
          "titulo":this.title,
          "imagen": dataURL,
          "descripcion":this.description,
          "autor":LoggedUserId,
        }

        console.log(formData);

        /* Aquí en lugar de bajarla al PC del usuario tengo que mandarla por POST al servidor */

        axios.post(`${APIRoot}/api/v1/publicaciones/`, formData)
        .then(response => {
        console.log('Image saved successfully', response.data);
        this.$emit("update:imageSaved", true);
        })
        .catch(error => {
        console.error('Error saving image', error);
        });

        // this.downloadImage(dataURL, 'doodle.jpeg');


        // Cerrar la ventana

        // Recargar los posts para ver el nuevo

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100vw;
}

.canvas {
  background-color: rgb(231, 231, 231);
  border-radius: 20px;
  border: 3px dashed #000000;
}

.text-input-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20vw;
  background-color: transparent;
}

.newpost-title {
  border-radius: 0.5rem;
  padding: 5px;
  font-size: 18px;
  width: 100%;
}

.newpost-description {
  border-radius: 0.5rem;
  padding: 5px;
  font-size: 18px;
  width: 100%;
}

.save-button {
  padding: 1rem;
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 15px;
}

</style>