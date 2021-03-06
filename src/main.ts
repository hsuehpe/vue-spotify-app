import './main.postcss'
import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import installPlugins from './plugins'
import { store } from '/~/store'
import 'vue-slider-component/theme/default.css'

import App from './App.vue'

const app = createApp(App)

installPlugins(app)

app.use(store)
app.use(lazyPlugin, {
  loading: '',
  error: 'error.png',
})

// true for hydrate
app.mount('#app', true)
