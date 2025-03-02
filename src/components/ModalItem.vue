<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
let intervalId = ref(null)

defineProps({
  modalVisible: {
    type: Boolean,
    required: true,
  },
})

defineEmits( {
  deleteAllTask: 'deleteAllTask',
  cancelDeletion: 'cancelDeletion',


})

const startInterval = () => {
  intervalId.value = setInterval(() => {
    console.log('Модальное окно открыто');
  }, 1000);
};

onMounted(() => {
    startInterval();
})

onUnmounted(() => {
  clearInterval(intervalId.value);
  intervalId.value = null
  console.log('Интервал очищен')
});
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__title">Подтвердите удаление</div>
      </div>
      <div class="modal__body">
        <p class="modal__desc">Вы действительно хотите удалить все завершенные задачи?
        </p>
      </div>
      <div class="modal__footer">
      <button class="button button_delete" @click="$emit('deleteAllTask')">Удалить</button>
      <button class="button button_cancel" @click="$emit('cancelDeletion')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #49505772;
  z-index: 1;
}

.modal__content {
  padding: 30px 40px 33px 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 30%;
  background: rgb(255, 255, 255);
  border-radius: 8px;
}

.modal__header {
  font-style: normal;
  line-height: 24px;
}

.modal__title {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #334D6E;
  margin-bottom: 14px;
}

.modal__desc {
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  color: #495057;
}

.modal__footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 20px 6px;
}

.button {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.button_delete {
  background-color: rgba(255, 4, 4, 0.73);
  border: 1px solid #050000;
  border-radius: 4px;
}

.button_delete:hover {
  background-color: rgb(232, 11, 11);
}

.button_cancel {
  background-color: white;
  border: 1px solid #040000;
  border-radius: 4px;
}

.button_cancel:hover {
  background-color: rgba(202, 202, 202, 0.7);
}

</style>
