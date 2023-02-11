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
      <form class="form-container">
        <a href="#" @click.prevent="switchForm">{{ isLogin ? "Don't have an account? Switch to register" : "Already have an account? Switch to Login" }}</a>
        <template v-if="!isLogin">
          <input class="form-input" type="text" placeholder="Username" />
          <input class="form-input" type="email" placeholder="Email" />
          <input class="form-input" type="password" placeholder="Password" />
          <input class="form-input" type="password" placeholder="Confirm Password" />
        </template>
        <template v-else>
          <input class="form-input" type="email" placeholder="Email" />
          <input class="form-input" type="password" placeholder="Password" />
        </template>
        <button class="form-submit" type="submit"><RouterLink to="/dashboard">{{ isLogin ? 'Login' : 'Register' }}</RouterLink></button>
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

  .form-container {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F1F1;
    padding: 40px;
    max-width: 500px;
    margin: 100px auto;
  }

  .form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DCDCDC;
  border-radius: 5px;
  font-size: 16px;
  color: #707070;
  transition: border-color 0.3s ease-in-out;
}

.form-input:focus {
  border-color: #707070;
  outline: none;
}

.form-submit {
  width: 100%;
  padding: 10px;
  background-color: #464646;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.form-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
}

.form-submit:active {
  transform: translateY(-1px);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
}

</style>
