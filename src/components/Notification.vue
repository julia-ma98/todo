<script setup>

  defineEmits({
    closedNotification: "closedNotification"
  })
</script>

<template>
<div class="notification">
  <span class="notification__text">Добавлена новая задача!🌸</span>
  <img @click="$emit('closedNotification')" class="notification__closed" src="./icons/img.png" alt="Крестик">
</div>
</template>

<style scoped>

.notification {
  display: flex;
  justify-content: flex-start;
  background-color: #fbfbfb;
  width: 220px;
  height: 80px;
  border-radius: 6px;
  border: 1px solid #bf18d1;
  position: relative;
  top: 230px;
  background-image: url("./icons/ph-not.gif");
}
.notification__text {
  text-align: center;
  font-size: 20px;
  padding: 5px;
}

.notification__closed {
  width: 12px;
  height: 12px;
  margin: 5px 5px;
}

</style>
