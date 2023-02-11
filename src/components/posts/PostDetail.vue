<template>
    <div class="single-post">
      <h1>{{ title }}</h1>
      <img :src="image" alt="post image"/>
      <p>{{ description }}</p>
      <div class="buttons">
        <button @click="editPost">Edit</button>
        <button @click="deletePost">Delete</button>
      </div>
      <div class="likes">
        <span>{{ likeCount }} likes</span>
        <button @click="toggleLike">
          {{ liked ? 'Unlike' : 'Like' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SinglePost',
    props: ['title', 'image', 'description', 'likeCount', 'liked'],
    methods: {
      editPost() {
        // implementation for editing post goes here
      },
      deletePost() {
        // implementation for deleting post goes here
      },
      toggleLike() {
        // implementation for toggling like/unlike goes here
      }
    }
  }
  </script>
  
  <style>
  .single-post {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    max-width: 800px;
    margin: 50px auto;
    text-align: center;
  }
  
  .single-post h1 {
    font-size: 36px;
    margin-bottom: 25px;
  }
  
  .single-post img {
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #ccc;
  }
  
  .single-post p {
    font-size: 18px;
    margin-bottom: 25px;
  }
  
  .single-post .buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }
  
  .single-post .buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  .single-post .buttons button:hover {
    background-color: #ccc;
  }
  
  .single-post .likes {
    display: flex;
    justify-content: center;
  }
  
  .single-post .likes span {
    font-size: 18px;
    margin-right: 10px;
  }
  
  .single-post .likes button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  .single-post .likes button:hover {
    background-color: #ccc;
  }
  </style>
  