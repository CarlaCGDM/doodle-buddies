<script setup>
  import APIRoot from '../router/APIRoot';
  import LoggedUserId from '../router/LoggedUser';
  import NavBar from '../components/NavBar.vue';
  
  import axios from 'axios';
</script>
<template>
  <main>
    <div class="profile-container">
      <div class="profile-header" v-if="showUserInfo">
        <img class="profile-picture" :src="`${APIRoot}/${this.userInfo.avatar}`"/>
        <h2 class="profile-name">@_{{ this.userInfo.nombreusu }}</h2>
        <p class="profile-joined-date">Member since {{ this.userInfo.fechaAlta.split(',')[0] }}</p>
      </div>
      <div class="tab-container">
        <div class="tab" :class="{selected : showingPosts}" @click="showPosts">
          Posts
        </div>
        <div class="tab" :class="{selected : showingLikes}" @click="showLikes">
          Likes
        </div>
      </div>
      <div class="likes-container" v-if="showingLikes && canShowLikes">

        <!-- Favoritos del usuario -->

        <div v-for="post,index in this.userLikes.favoritos" :key="index">
      
        <Post 
        :title="post.titulo"
        :id="index"
        :likes="post.favoritos.length"
        :imgSrc="`${APIRoot}/${post.imagen}`"/>
    
        </div>
    
      </div>

      <div class="posts-container" v-if="showingPosts && canShowPosts">
        
        <!-- Publicaciones del usuario -->

        <div v-for="post,index in this.userPosts.publicaciones" :key="index">
      
        <Post 
        :title="post.titulo"
        :id="index"
        :likes="post.favoritos.length"
        :imgSrc="`${APIRoot}/${post.imagen}`"/>
      
        </div>

      </div>
    </div>
  </main>

  <NavBar />

  </template>
  
  <script>
  import Post from '../components/posts/Post.vue';
  
  export default {
    components: {
      Post
    },
    data() {
      return {
        showingLikes: false,
        canShowLikes: false,
        showingPosts: true,
        canShowPosts: false,
        showUserInfo: false,
        userInfo: {},
        userPosts: [],
        userLikes: [],
        profilePicture: '', // URL to the user's profile picture
        profileName: '', // User's name
        joinedDate: '', // User's date of joining
        posts: [], // Array of user's posts
        favorites: [], // Array of user's favorite posts
        selectedTab: 'posts' // The currently selected tab
      }},
      mounted() {
        this.getUserData();
        this.getUserLikes();
        this.getUserPosts();
      },

      methods: {

        showLikes() {
          console.log(this.userInfo);
          this.showingLikes = true;
          this.showingPosts = false;
        },

        showPosts() {
          this.showingLikes = false;
          this.showingPosts = true;
        },

        getUserData() {

        // Foto y nombre del usuario

        axios
        .get(`${APIRoot}/api/v1/usuarios/usuario/${LoggedUserId}`)
        .then((result) => {

          
          console.log("hay info del usuario");
          console.log(result.data);
          this.userInfo = result.data;
          this.showUserInfo = true;

        })
        .catch( error => {  } );

        },

        getUserLikes() {

        // Favoritos del usuario

        axios
        .get(`${APIRoot}/api/v1/publicaciones/favoritos/${LoggedUserId}`)
        .then((result) => {

          console.log("hay favoritos del usuario");
          console.log(result.data);
          this.userLikes = result.data;
          this.canShowLikes = true;
        })
        .catch( error => {} );
        },

        getUserPosts() {
          
          // Publicaciones del usuario

        axios
        .get(`${APIRoot}/api/v1/publicaciones/usuario/${LoggedUserId}`)
        .then((result) => {

          console.log("hay publicaciones del usuario");
          console.log(result.data);
          this.userPosts = result.data;
          this.canShowPosts = true;
        })
        .catch( error => {} );
        }

      
      }
    }
  </script>
  
  <style>

.selected {
  background-color: gray;
}

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
  
  .posts-container, .likes-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    justify-content: center;
    overflow-y: scroll;
    gap: 1rem;
  }
  </style>
  
  <!-- <template>
    <div>
      <button @click="showDiv1">Show Div 1</button>
      <button @click="showDiv2"> Show Div 2</button>
      <div v-show="showFirstDiv" style="background-color: blue; height: 100px; width: 100px;"></div>
      <div v-show="showSecondDiv" style="background-color: red; height: 100px; width: 100px;"></div>
    </div>
  </template> -->
  
  <!-- <script>
  export default {
    data() {
      return {
        showFirstDiv: true,
        showSecondDiv: false
      };
    },
    methods: {
      showDiv1() {
        this.showFirstDiv = true;
        this.showSecondDiv = false;
      },
      showDiv2() {
        this.showFirstDiv = false;
        this.showSecondDiv = true;
      }
    }
  };
  </script>
  
  <style>
    div {
      display: inline-block;
    }
  </style> -->
  
  