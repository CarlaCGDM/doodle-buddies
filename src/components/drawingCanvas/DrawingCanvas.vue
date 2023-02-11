<script setup>
    import ColorPicker from "./ColorPicker.vue";
</script>

<template>
    <form>
        <input type="text" placeholder="Title" />
        <div class="drawing-area">
          <canvas ref="canvas" width="800" height="400" @mousedown="startDrawing" @mousemove="continueDrawing" @mouseup="stopDrawing"></canvas>
          <ColorPicker @update:brushColor="updateBrushColor"/>
        </div>
        <textarea placeholder="Description"></textarea>
        <button @click="saveImage">Save Image</button>
    </form>
  </template>
  
  <script>
  import {fabric} from 'fabric';
  
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
      this.startDrawing("#fff");
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

        /* Aquí en lugar de bajarla al PC del usuario tengo que mandarla por POST al servidor */

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
.drawing-area {
  display: flex;
  flex-direction: row;
  margin: 10px;
}

.color-picker {
  position:fixed;
  right: 0;
}
</style>