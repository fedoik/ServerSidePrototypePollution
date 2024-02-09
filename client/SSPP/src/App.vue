<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
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