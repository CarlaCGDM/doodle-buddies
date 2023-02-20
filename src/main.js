import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$APIRoot = 'https://doodlebuddiesapi-production.up.railway.app';

app.use(router)

app.mount('#app')
