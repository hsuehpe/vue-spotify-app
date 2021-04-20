import { App } from 'vue'
import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
// progress bar
import NProgress from 'nprogress'
import store from '../store'
import { ActionTypes as appActionTypes } from '/~/store/app/actions'
import { ActionTypes as authActionTypes } from '/~/store/auth/actions'

export default (app: App) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('/~/views/Login.vue'),
      },
      {
        path: '/',
        name: 'Home',
        redirect: {
          name: 'browse',
        },
      },
      {
        path: '/user/:id',
        name: 'user',
        component: () => import('/~/views/User/index.vue'),
      },
      {
        path: '/artist/:id',
        name: 'artist',
        component: () => import('/~/views/Artist.vue'),
      },
      {
        path: '/album/:id',
        name: 'album',
        component: () => import('/~/views/Album.vue'),
      },
      {
        path: '/browse',
        name: 'browse',
        component: () => import('/~/views/Browse/index.vue'),
      },
      {
        path: '/user/:user_id/playlist/:playlist_id',
        name: 'playlist',
        component: () => import('/~/views/Playlist.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        beforeEnter(_to, _from, next) {
          store.dispatch(`AppModule/${appActionTypes.SET_NOT_FOUND}`, true)
          next()
        },
      },
    ],
  } as RouterOptions)

  router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log(store.getters)
    if (store.getters['AppModule/notFound'])
      store.dispatch(`AppModule/${appActionTypes.SET_NOT_FOUND}`, false)

    if (!store.getters['AuthModule/getAccessToken'] && to.name !== 'Login') {
      store.dispatch(`AuthModule/${authActionTypes.LOGIN_USER}`)
      next(false)
    }

    next()
  })
  router.afterEach(() => { NProgress.done() })

  app.use(router)
}
