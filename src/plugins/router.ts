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
        path: '/search',
        name: 'search',
        component: () => import('/~/views/Search/index.vue'),
        children: [
          {
            path: 'result/:query',
            name: 'search-result',
            component: () => import('/~/views/Search/SearchResult.vue'),
          },
          {
            path: 'album/:query',
            name: 'search-album',
            component: () => import('/~/views/Search/SearchAlbum.vue'),
          },
          {
            path: 'artist/:query',
            name: 'search-artist',
            component: () => import('/~/views/Search/SearchArtist.vue'),
          },
          {
            path: 'playlist/:query',
            name: 'search-playlist',
            component: () => import('/~/views/Search/SearchPlaylist.vue'),
          },
          {
            path: 'track/:query',
            name: 'search-track',
            component: () => import('/~/views/Search/SearchTrack.vue'),
          },
        ],
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
        path: '/genres/:id',
        name: 'genres',
        component: () => import('/~/views/Genres.vue'),
      },
      {
        path: '/browse',
        name: 'browse',
        component: () => import('/~/views/Browse/index.vue'),
        redirect: {
          name: 'browse-genres',
        },
        children: [
          {
            name: 'browse-genres',
            path: 'genres',
            component: () => import('/~/views/Browse/Genres.vue'),
          },
          {
            name: 'browse-new-releases',
            path: 'new-releases',
            component: () => import('/~/views/Browse/NewReleases.vue'),
          },
        ],
      },
      {
        path: '/collection/tracks',
        name: 'tracks-collection',
        component: () => import('/~/views/Collection/Tracks.vue'),
      },
      {
        path: '/collection/albums',
        name: 'albums-collection',
        component: () => import('/~/views/Collection/Albums.vue'),
      },
      {
        path: '/collection/artists',
        name: 'artists-collection',
        component: () => import('/~/views/Collection/Artists.vue'),
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
