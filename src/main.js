import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('Ошибка:', err);
  console.log('Произошла ошибка в компоненте:', instance)
  console.log(info);
}

app.use(router)

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
app.use(store);

app.mount('#app')
