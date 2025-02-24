<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ToDoItem from '@/components/ToDoItem.vue'
import ToDoView from '@/views/ToDoView.vue'
import { computed, ref, watch } from 'vue'
const todoItems = ref([]);
const tasks = ref([]);
const addedTasks = ref([]);
const newTask = ref('');
let showTooltip = ref(false);
const message = ref('Введите текст');
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

watch(addedTasks, (newItems) => {
  console.log('Добавлена новая задача', newItems);
  localStorage.setItem('addedTasks', JSON.stringify(newItems));
}, { deep: true });

</script>

<template>
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->
  <div class="container">
      <to-do-item :tooltip-visible="showTooltip"
                  :tooltip-msg="message"
        :items="todoItems" @deleteItem="handleDelete" @activeItem="handleActive" @upItem="handleUp" @downItem="handleDown" @changeItemText="handleChangeText" @addItem="handleAddTask" @textDanger="handleErr"/>
      <div class="add">
        <button class="button button_add" @click="handleAdd">
          <span class="button__text">Добавить</span>
        </button>
       </div>
    <ul class="tasks">
      <li v-for="task in addedTasks" :key="task.id">{{ task.text }}</li>
    </ul>
    <span class="activeTask">Количество активных задач {{activeTasks}}</span>
  <to-do-view />
    </div>

</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.add {
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.button__text {
  line-height: 20px;
  color: #4c4a4a;
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

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
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
