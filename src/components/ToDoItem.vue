<script setup>
// defineProps({
//   text: {
//     type: String,
//     required: true,
//   },
// })
import { ref } from 'vue'
// const hideInput = ref(false);

</script>

<template>
  <div class="input__wrapper">
    <div class="control">
      <button class="button button_check"><img class="icon" src="./icons/img_3.png" alt="Галочка"></button>
    </div>
    <div class="input__control">
      <input type="text" class="input__text" placeholder="напишите задачу">
    </div>
    <div class="control">
      <button class="button button_up"><img class="icon" src="./icons/img_2.png" alt="Стрелка вверх"></button>
    </div>
    <div class="control">
      <button class="button button_down"><img class="icon" src="./icons/img_1.png" alt="Стрелка вниз"></button>
    </div>
    <div class="control">
      <button class="button button_delete"><img class="icon" src="./icons/img.png" alt="Крестик"></button>
    </div>
  </div>
</template>

<style scoped>
.input__control {
  position: relative;
}

.input__text {
  position: relative;
  padding: 30px 40px;
  width: 600px;
  height: calc(2.25rem + 2px);
  font-size: 16px;
  line-height: 20px;
  border: 1px solid rgba(173, 241, 154, 0.66);
}

.input__text:focus {
  border: 1px solid rgba(173, 241, 154, 0.87);
}

.input__text::placeholder {
  color: #4c4a4a;
  opacity: 0.2;
}

.button {
  height: calc(2.25rem + 2px);
  padding: 30px 30px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_check {
  background-color: rgba(255, 255, 255, 0.93);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid rgba(219, 220, 219, 0.55);
}

.button_check:hover {
  background-color: rgba(249, 250, 249, 0.86);
}

.button_check:focus {
    border: 1px solid rgba(251, 251, 251, 0.98);
}

.button_up {
  background-color: rgba(109, 134, 234, 0.55);
  border: 1px solid rgba(109, 134, 234, 0.55);
  border-right: none;
}

.button_up:hover {
  background-color: rgba(109, 134, 234, 0.83);
}

.button_up:focus {
  border: 1px solid rgb(109, 134, 234);
}

.button_down {
  background-color: rgba(109, 134, 234, 0.55);
  border: 1px solid rgba(109, 134, 234, 0.55);
  border-right: none;
}

.button_down:hover {
  background-color: rgba(109, 134, 234, 0.83);
}

.button_down:focus {
  border: 1px solid rgb(109, 134, 234);
}

.button_delete {
  background-color: rgba(243, 25, 63, 0.55);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid rgba(243, 25, 63, 0.55);
}

.button_delete:hover {
  background-color: rgba(243, 25, 63, 0.79);
}

.button_delete:focus {
  border: 1px solid rgb(243, 25, 63);
}

.control {
  margin: -1px;
}

.icon {
  width: 20px;
  height: 20px;
  font-weight: 500;
}
</style>
