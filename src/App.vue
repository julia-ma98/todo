<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ToDoItem from '@/components/ToDoItem.vue'
import ToDoView from '@/views/ToDoView.vue'
import { ref } from 'vue'
const todoInputs = ref([])
const hideInput = ref(false)
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
    <div class="input__wrapper">
      <to-do-item />
    </div>
      <div class="add">
        <button class="button button_add" @click="hideInput = true">
          <span class="button__text">Добавить</span>
        </button>
       </div>
  <to-do-view />
    </div>

</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.input__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
