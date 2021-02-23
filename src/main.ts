import './main.postcss'
import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import debounce from 'lodash-es/debounce'
import installPlugins from './plugins'
import { store } from '/~/store'

import 'optiscroll'

import App from './App.vue'

const app = createApp(App)

installPlugins(app)

app.use(store)
app.use(lazyPlugin, {
  loading: 'loading.png',
  error: 'error.png',
})

app.directive('scroll', {
  beforeMount(el, binding, vnode: any) {
    el.classList.add('optiscroll')

    const optiScroll = new Optiscroll(el, {})

    el.addEventListener('scrollreachbottom', (ev: CustomEventInit<unknown> | undefined) => {
      if (vnode.componentInstance)
        vnode.componentInstance.$emit('scroll-reach-bottom', ev)
      else
        vnode.elm.dispatchEvent(new CustomEvent('scroll-reach-bottom', ev))
    })

    const scrollHandler = debounce((ev: CustomEventInit<unknown> | undefined) => {
      if (vnode.componentInstance)
        vnode.componentInstance.$emit('v-scroll', ev)
      else
        vnode.elm.dispatchEvent(new CustomEvent('v-scroll', ev))
    }, 300)

    el.addEventListener('scroll', scrollHandler)
  },
})

// true for hydrate
app.mount('#app', true)
