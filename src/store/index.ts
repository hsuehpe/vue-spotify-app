import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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

export type State = {
  auth: AuthState
  app: AppState
}

export type Store = AuthStore<Pick<State, 'auth'>> | AppStore<Pick<State, 'app'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production'
      ? [createPersistedState()]
      : [createLogger(), createPersistedState()],
  modules: { AuthModule, AppModule },
})

export default store
