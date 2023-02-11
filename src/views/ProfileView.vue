<template>
    <div class="profile-container">
      <div class="profile-header">
        <img class="profile-picture" :src="profilePicture"/>
        <h2 class="profile-name">{{ profileName }}</h2>
        <p class="profile-joined-date">{{ joinedDate }}</p>
      </div>
      <div class="tab-container">
        <div class="tab" @click="selectedTab = 'posts'">
          Posts
        </div>
        <div class="tab" @click="selectedTab = 'favorites'">
          Favorites
        </div>
      </div>
      <div class="posts-container" v-if="selectedTab === 'posts'">
        <!-- Use the Post component to display the user's posts -->
        <Post v-for="post in posts" :key="post.id" :post="post"/>
      </div>
      <div class="favorites-container" v-if="selectedTab === 'favorites'">
        <!-- Use the Post component to display the user's favorite posts -->
        <Post v-for="favorite in favorites" :key="favorite.id" :post="favorite"/>
      </div>
    </div>
  </template>
  
  <script>
  import Post from '../components/posts/Post.vue';
  
  export default {
    components: {
      Post
    },
    data() {
      return {
        profilePicture: '', // URL to the user's profile picture
        profileName: '', // User's name
        joinedDate: '', // User's date of joining
        posts: [], // Array of user's posts
        favorites: [], // Array of user's favorite posts
        selectedTab: 'posts' // The currently selected tab
      }
    }
  }
  </script>
  
  <style>
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  
  .profile-name {
    font-size: 24px;
    margin-top: 10px;
  }
  
  .profile-joined-date {
    font-size: 16px;
    color: gray;
    margin-top: 10px;
  }
  
  .tab-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .tab {
    padding: 10px 20px;
    border: 1px solid gray;
    border-radius: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .tab.selected {
    background-color: lightgray;
  }
  
  .posts-container, .favorites-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>
  