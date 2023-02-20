<template>
    <navbar class="navbar">
        <RouterLink :to="{name: 'dashboard'}">Dashboard</RouterLink>
        <RouterLink :to="{name: 'profile'}">Profile</RouterLink>
        <RouterLink :to="{name: 'home'}">Logout</RouterLink>
    </navbar>
</template>

<script>
export default {
  data() {
    return {
      showSquare: false,
    };
  },
  methods: {
    toggleSquare() {
      this.showSquare = !this.showSquare;
      this.$emit("update:showCanvas", true);
    },
    imageSaved() {
      this.toggleSquare();
    }
  },
};
</script>

<style>
  .navbar {
    position: fixed;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    top: 2rem;
    left: 7rem;
    height: 4rem;
    border-radius: 20px;
    color: white;
    transition: all 0.3s ease-in-out;
    border-width: 0px;

  }

  </style>