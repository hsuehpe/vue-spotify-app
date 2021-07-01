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

import {
  PlaylistModule,
  Store as PlaylistStore,
  State as PlaylistState,
} from './playlist'

import {
  SearchModule,
  Store as SearchStore,
  State as SearchState,
} from './search'

export type State = {
  auth: AuthState
  app: AppState
  user: UserState
  player: PlayerState
  library: LibraryState
  playlist: PlaylistState
  search: SearchState
}

export type Store = AuthStore<Pick<State, 'auth'>> |
AppStore<Pick<State, 'app'>> |
UserStore<Pick<State, 'user'>> |
LibraryStore<Pick<State, 'library'>> |
PlaylistStore<Pick<State, 'playlist'>> |
PlayerStore<Pick<State, 'player'>> |
SearchStore<Pick<State, 'search'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production'
      ? [createPersistedState(), spotifyApiPlugin]
      : [createLogger(), createPersistedState(), spotifyApiPlugin],
  modules: { AuthModule, AppModule, UserModule, PlayerModule, LibraryModule, PlaylistModule, SearchModule },
})

export default store
