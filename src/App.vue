<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import FormOne from "./components/FormOne.vue";
import FormTwo from "./components/FormTwo.vue";
</script>

<template>
  <FormOne></FormOne>
  <FormTwo></FormTwo>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
