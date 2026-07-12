import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())

router.push('/clients')
app.use(router)
app.mount('#app')
