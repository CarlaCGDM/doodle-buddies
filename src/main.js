import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Iconos de Font Awesome

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faArrowUp,faArrowDown,faHeart)

// Iconos de Font Awesome

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.mount('#app')


