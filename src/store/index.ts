import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import spotifyApiPlugin from '/~/api/spotify/plugin'

import {
  AuthModule,
  Store as AuthStore,
  State as AuthState,
} from './auth'

import {
  AppModule,
  Store as AppStore,
  State as AppState,
} from './app'

import {
  UserModule,
  Store as UserStore,
  State as UserState,
} from './user'

import {
  PlayerModule,
  Store as PlayerStore,
  State as PlayerState,
} from './player'

import {
  LibraryModule,
  Store as LibraryStore,
  State as LibraryState,
} from './library'

export type State = {
  auth: AuthState
  app: AppState
  user: UserState
  player: PlayerState
  library: LibraryState
}

export type Store = AuthStore<Pick<State, 'auth'>> | AppStore<Pick<State, 'app'>> | UserStore<Pick<State, 'user'>> | LibraryStore<Pick<State, 'library'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production'
      ? [createPersistedState(), spotifyApiPlugin]
      : [createLogger(), createPersistedState(), spotifyApiPlugin],
  modules: { AuthModule, AppModule, UserModule, PlayerModule, LibraryModule },
})

export default store
