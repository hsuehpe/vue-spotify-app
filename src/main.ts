import './main.postcss'
import { createApp } from 'vue'
import installPlugins from './plugins'
import { store } from '/~/store'

import App from './App.vue'

const app = createApp(App)

installPlugins(app)

app.use(store)

// true for hydrate
app.mount('#app', true)
