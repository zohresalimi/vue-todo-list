import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrash,faCheck)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
