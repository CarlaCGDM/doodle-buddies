<script setup>
</script>

<template>
  <div class="register-container">
    <div class="left-section">
      <h1>Registration Page</h1>
      <p v-if="!isLogin">Welcome to our registration page. Please fill out the form on the right to create an account.</p>
      <p v-else>Welcome back! Please enter your email and password to log in.</p>
    </div>
    <div class="right-section">
      <form class="access-form">
        <template v-if="!isLogin">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
        </template>
        <template v-else>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </template>
        <button type="submit"><RouterLink to="/dashboard">{{ isLogin ? 'Login' : 'Register' }}</RouterLink></button>
        <a href="#" @click.prevent="switchForm">{{ isLogin ? 'Switch to Register' : 'Switch to Login' }}</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    switchForm() {
      this.isLogin = !this.isLogin;
    }
  }
};
</script>

<style>
  .register-container {
    display: flex;
    height: 100vh;
  }

  .left-section {
    width: 50%;
    padding: 2em;
    text-align: center;
  }

  .right-section {
    width: 50%;
    padding: 2em;
  }

  .access-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: orange;
    padding: 1em;
    border-radius: 20px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 80%;
    height: 2em;
    margin-bottom: 1em;
    padding: 0.5em;
  }

  button[type="submit"] {
    width: 80%;
    height: 2em;
    background-color: blue;
    color: white;
    font-weight: bold;
    margin-top: 1em;
  }

  a {
    color: blue;
    text-decoration: underline;
    margin-top: 1em;
  }
</style>
