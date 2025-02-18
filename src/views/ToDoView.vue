<template>
    <li v-for="n in count">{{ n }}</li>
</template>

<style scoped>
  .todo {
    display: block;
  }
  h1 {
    text-align: center;
  }
</style>
<script setup>
import { ref } from 'vue'
 const count = ref(0)
</script>
