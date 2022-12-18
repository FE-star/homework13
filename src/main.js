import App from './App.vue'
import { createApp } from './mini-renderer.js'
// import { createApp } from '@vue/runtime-dom'

console.log('begin create App')
createApp(App).mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'

// import './assets/main.css'

// createApp(App).mount('#app')
