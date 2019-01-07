<template>
  <div id="app">
    <Header msg="My themed component" />
    <Header msg="Another one" />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style theme="a">
html {
  background-color: #dddddd;
}
</style>

<style theme="b">
html {
  background-color: #38aa84;
}
</style>
