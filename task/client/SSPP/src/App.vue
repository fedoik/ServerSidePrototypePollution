<template>
  <Toast></Toast>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import Toast from 'primevue/toast';

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Toast
  },

}
</script>

<style>
/* * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
} */
</style>