<script setup>

</script>

<template>
  <slot name="header"></slot>
  <div class="added-wrapper">
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
.added-wrapper {
  border-bottom: 1px solid rgba(193, 138, 211, 0.89);
  border-radius: 4px;
  padding: 4px;
}

</style>
