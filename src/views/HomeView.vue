<script setup>
</script>

<template>
  <div class="register-container">
    <div class="left-section">
      <h1 class="main-title">DoodleBuddies</h1>
      <p class="subtitle">Ready to make art?</p>
    </div>
    <div class="right-section">
      <form class="form-container">
        <a href="#" @click.prevent="switchForm">{{ isLogin ? "Don't have an account? Switch to register" : "Already have an account? Switch to Login" }}</a>
        <template v-if="!isLogin">

          <p v-if="usernameError" class="error">¡El nombre de usuario debe tener entre 8 y 16 caracteres, y no puede contener caracteres especiales!</p>
          <input class="form-input" type="text" v-model="username" placeholder="Username" />
         
          <p v-if="newEmailError" class="error">¡La dirección de correo ser válida!</p>
          <input class="form-input" type="email" v-model="newEmail" placeholder="Email" />

          <p v-if="newPasswordError" class="error">¡La contraseña debe contener entre 8 y 16 caracteres, incluyendo al menos un número, una mayúscula, una minúscula y un carácter especial!</p>
          <input class="form-input" type="password" v-model="newPassword" placeholder="Password" />

          <p v-if="confirmPasswordError" class="error">¡Las contraseñas deben coincidir!</p>
          <input class="form-input" type="password" v-model="confirmPassword" placeholder="Confirm Password" />

        </template>
        <template v-else>

          <p v-if="emailError" class="error">¡Debes introducir una dirección de correo electrónico!</p>
          <input class="form-input" type="email" v-model="email" placeholder="Email" />

          <p v-if="passwordError" class="error">¡Debes introducir una contraseña!</p>
          <input class="form-input" type="password" v-model="password" placeholder="Password" />
        </template>
        <button type="button" class="form-submit" @click="validateData()">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      email: '',
      emailError: false,
      newEmail: '',
      newEmailError: false,
      password: '',
      passwordError: false,
      newPassword: '',
      newPasswordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      username: '',
      usernameError: false,
    };
  },
  methods: {

    switchForm() {

      // Cambiar formulario

      this.isLogin = !this.isLogin;

      // Limpiar errores

      this.emailError = false;
      this.newEmailError = false;
      this.passwordError = false;
      this.newPasswordError = false;
      this.confirmPasswordError = false;
      this.usernameError = false;

    },

    validateData() {

      if (this.isLogin) {

        // Ver si alguno de los campos se ha dejado vacío

        if (this.email == '') {
          this.emailError = true;
        } else {
          this.emailError = false;
        }

        if (this.password == '') {
          this.passwordError = true;
        } else {
          this.passwordError = false;
        }

        if (!this.emailError && !this.passwordError) {

          // Aquí es donde haremos la comprobación de si el usuario existe o no en la BD cuando la tengamos.
          // Habíamos planteado la posibilidad de hashear la password antes de mandarla a la BD, pero tras investigar sobre el tema...
          // en general he visto que no se recomienda hacerlo. En su lugar, se recomienda realizar todas las comprobaciones en la BD
          // para mayor seguridad, así que haré eso en su lugar para el proyecto final.

          // Después, redirigimos al dashboard.
          // Cuando tengamos incorporado el login, crearemos aquí también una cookie de sesión para el usuario correspondiente.

          this.$router.push({ name: 'dashboard' })
        }

      } else {


        // Ver si alguno de los campos es inválido
        // Como estamos registrando un usuario nuevo, aquí si debemos comprobar en el lado del cliente...
        // si los datos introducidos son válidos antes de mandárselos al servidor.

        if (!this.isValidEmail(this.newEmail)) {
          this.newEmailError = true;
        } else {
          this.newEmailError = false;
        }

        if (!this.isValidUsername(this.username)) {
          this.usernameError = true;
        } else {
          this.usernameError = false;
        }

        if (!this.isValidPassword(this.newPassword)) {
          this.newPasswordError = true;
        } else {
          this.newPasswordError = false;
        }

        if (this.confirmPassword != this.newPassword) {
          this.confirmPasswordError = true;
        } else {
          this.confirmPasswordError = false;
        }

        if ( !this.newEmailError && !this.newPasswordError && !this.confirmPasswordError && !this.usernameError ) {

          this.$router.push({ name: 'dashboard' })

        }

      }
    },

    isValidPassword(password) {
      const regEx = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,16})/;
      return regEx.test(password) ? true : false;
    },

    isValidEmail(email) {
      const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regEx.test(email) ? true : false;
    },

    isValidUsername(username) {
      const regEx = /^[a-zA-Z0-9 !¿?@#$%^&*)(]{8,16}$/;
      return regEx.test(username) ? true : false;
    }
  }
};

</script>

<style>

  .main-title {
    font-size: 4rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3vw;
    height: 100vh;
  }

  .left-section {
    padding: 2em;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .right-section {
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
