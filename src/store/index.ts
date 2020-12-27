import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {
  AuthModule,
  Store as AuthStore,
  State as AuthState,
} from './auth'

export type State = {
  auth: AuthState
}

export type Store = AuthStore<Pick<State, 'auth'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production'
      ? [createPersistedState()]
      : [createLogger(), createPersistedState()],
  modules: { AuthModule },
})

export function useStore(): Store {
  return store as Store
}

export default store
