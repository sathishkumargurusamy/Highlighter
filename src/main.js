import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'
import store from "./store";
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)

app.use(router)
app.use(store)

app.mount('#app')
