import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('Ошибка:', err);
  console.log('Произошла ошибка в компоненте:', instance)
  console.log(info);
}

app.use(router)

app.mount('#app')
