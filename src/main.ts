import './main.postcss'
import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import debounce from 'lodash-es/debounce'
import installPlugins from './plugins'
import { store } from '/~/store'

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
