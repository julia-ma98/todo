<script setup>
import { computed, ref, watch, onMounted } from 'vue'

import ToDoItem from '@/components/ToDoItem.vue'
import ModalItem from '@/components/ModalItem.vue'
import AddedTaskSlot from '@/components/AddedTaskSlot.vue'
import Notification from '@/components/Notification.vue'

const todoItems = ref([]);
const addedTasks = ref([]);
let showTooltip = ref(false);
let showModal = ref(false);
const message = ref('Введите текст');
let showNotification = ref(false);
const handleAdd = () => {
  todoItems.value = [...todoItems.value, {id: todoItems.value.length, name: "item", active: false, text: '', showTooltip: false, message: 'Введите текст'}]
}
const handleDelete = (id) => {
  todoItems.value = [...todoItems.value].filter((item) => item.id !== id)
}
const handleActive = (id) => {
  todoItems.value = [...todoItems.value].map((item) => item.id === id ? {...item, active: !item.active} : item)
}
const handleUp = (id) => {
  const indexItem = [...todoItems.value].findIndex((item) => item.id === id);
  if (indexItem > 0) {
    [todoItems.value[indexItem], todoItems.value[indexItem - 1]] = [todoItems.value[indexItem - 1], todoItems.value[indexItem]]
  }
};
const handleDown = (id) => {
  const indexItem = [...todoItems.value].findIndex((item) => item.id === id);
  if (indexItem < todoItems.value.length - 1) {
    [todoItems.value[indexItem], todoItems.value[indexItem + 1]] = [todoItems.value[indexItem + 1], todoItems.value[indexItem]]
  }
};

const handleErr = (id) => {
  todoItems.value = [...todoItems.value].map((item) => item.id === id ? {...item, textDanger: !item.textDanger} : item)
}

 const handleAddTask = (id) => {
   try {
   const indexItem = [...todoItems.value].findIndex((item) => item.id === id);
     if (indexItem === -1) {
       throw new Error('Задача не найдена');
     }
     const task = todoItems.value[indexItem]
     if (!task.text) {
       showTooltip.value = true;
       setTimeout(() => {
       showTooltip.value = false;
       }, 3000);
       throw new Error('Пустое поле задачи');
     }
     addedTasks.value = [...addedTasks.value, task];
     handleShowNotification()
     handleDelete(id);
   } catch (error) {
     console.error('Ошибка при добавлении задачи:', error.message);
     handleErr(id)
   }
 }

const handleChangeText = (id, newText) => {
    const indexItem = [...todoItems.value].findIndex((item) => item.id === id);
    if (indexItem !== -1) {
      todoItems.value[indexItem]['text'] = newText
    }
  }
  const activeTasks = computed(() => {
    return todoItems.value.reduce((acc, currentValue) => {
      if (currentValue.active) {
        acc = acc+1
      }
      return acc;
    },0)
    }
  )

watch(activeTasks, (newCount) => {
  console.log('Изменилось количество активных задач:', newCount);
});

watch(todoItems, () => {
  console.log('Добавлена новая задача', todoItems.value);
  localStorage.setItem('todoItems', JSON.stringify(todoItems.value));
}, { deep: true });

onMounted(() => {
  console.log('the component is now mounted.')
  const tasks = localStorage.getItem('todoItems')
  if (tasks !== null) {
    console.log(tasks);
    console.log(JSON.parse(tasks));
    todoItems.value = JSON.parse(tasks)
  }
})

watch(addedTasks, () => {
  console.log('Добавлена новая задача', addedTasks.value);
  localStorage.setItem('addedTasks', JSON.stringify(addedTasks.value));
}, { deep: true });

onMounted(() => {
  const tasks = localStorage.getItem('addedTasks')
  if (tasks !== null) {
    addedTasks.value = JSON.parse(tasks)
  }
})

const completedTask = computed(() => {
    return addedTasks.value.reduce((acc, currentValue) => {
      return acc = acc+1
    },0)
  }
)

const handleDeleteAll = (id) => {
  addedTasks.value.splice(0, addedTasks.value.length);
  showModal.value = false;
}

const handleCanсelDelete = (id) => {
  showModal.value = false;
  console.log('Удаление задач отменено')
}

const handleModal = () => {
  showModal.value = true;
}

const handleClosedNotification = () => {
  showNotification.value = false;
}

const handleShowNotification = () => {
  showNotification.value = true;
  setInterval(() => {
    showNotification.value = false;
  },4000)
}

</script>

<template>
  <div class="container">
      <to-do-item :tooltip-visible="showTooltip"
                  :tooltip-msg="message"
        :items="todoItems" @deleteItem="handleDelete" @activeItem="handleActive" @upItem="handleUp" @downItem="handleDown" @changeItemText="handleChangeText" @addItem="handleAddTask" @textDanger="handleErr"/>
      <div class="add">
        <button class="button button_add" @click="handleAdd">
          <span class="button__text">Добавить задачу</span>
        </button>
    <ul class="tasks">
      <added-task-slot v-for="task in addedTasks" :key="task.id" class="task"><template #header> 🌸 </template>
        <template #default> {{task.text}} </template>
        <template #footer>. </template></added-task-slot>
    </ul>
    <button class="button button__deleteAll" @click="handleModal" :disabled="addedTasks.length === 0">Удалить все</button>
    <span class="activeTask">Количество активных задач {{activeTasks}}</span>
    <span class="completedTask">Количество завершенных задач {{completedTask}}</span>
      </div>
  <transition><modal-item v-if="showModal" @deleteAllTask="handleDeleteAll" @cancelDeletion="handleCanсelDelete"/></transition>
    </div>
  <teleport to="#teleport-target">
  <transition name="notification"><notification v-if="showNotification" @closedNotification="handleClosedNotification"/></transition>
  </teleport>
</template>

<style scoped>

.notification-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.notification-enter-active {
  transition: all 0.8s ease-out;
}

.notification-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.notification-enter, .notification-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.add {
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.button_add {
  background-color: rgba(59, 241, 39, 0.55);
  border-radius: 5px;
  border: 1px solid #1c670e;
}

.button_add:hover {
  background-color: rgba(59, 241, 39, 0.83);
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

.tasks {
  align-self: flex-start;
  font-size: 20px;
}

.task {
  margin-top: 20px;
  list-style: none;
  padding: 4px 7px 2px 7px;
  border-bottom: 1px solid #010201;
}


.button__deleteAll {
  margin-top: 20px;
  background-color: rgba(227, 40, 72, 0.65);
  border-radius: 5px;
  border: 1px solid rgba(243, 25, 63, 0.55);
  line-height: 20px;
  color: #0e0404;
  font-size: 20px;
  font-weight: bold;
}

.button__deleteAll:hover {
  background-color: rgba(236, 7, 41, 0.87);
}

.button__text {
  line-height: 20px;
  color: #0e0404;
  font-size: 20px;
  font-weight: bold;
}

.activeTask {
  font-size: 20px;
  font-weight: bold;
  color: rgba(37, 14, 14, 0.69);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.completedTask {
  font-size: 20px;
  font-weight: bold;
  color: rgba(37, 14, 14, 0.69);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
