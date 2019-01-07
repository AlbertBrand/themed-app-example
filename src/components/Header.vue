<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  font-weight: 900;
}
</style>

<style theme="a" scoped>
h1 {
  color: #9bdf35;
  background-color: #1c5508;
}
</style>

<style theme="c" scoped>
h1 {
  color: #c62cd4;
  background-color: #4e0f53;
}
</style>
