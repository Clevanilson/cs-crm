import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.css'
import router from './router'
import { ClientHttpGateway } from './infra/gateway/client-http.gateway.ts'
import { FetchAdapter } from './http/fetch-adapter.ts'

const app = createApp(App)

const httpClient = new FetchAdapter()
const ClientGateway = new ClientHttpGateway(httpClient)
app.provide('clientGateway', ClientGateway)
app.use(createPinia())
router.push('/clients')
app.use(router)
app.mount('#app')
