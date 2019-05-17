<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      this.$router.replace("/");
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html,body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
