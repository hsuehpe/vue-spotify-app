import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import { State as RootState } from '../index'
import mutations, { Mutations } from './mutations'
import getters, { Getters } from './getters'
import actions, { Actions } from './actions'

export type State = {
  lastSavedTrack: string
  lastRemovedTrack: string
}

const state: State = {
  lastSavedTrack: '',
  lastRemovedTrack: '',
}

// setup store type
export type Store<S = State> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
}

export const LibraryModule: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
