import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_PLAYLIST = 'SET_PLAYLIST',
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_PLAYLIST](state: S, playlist: object): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PLAYLIST](state: State, playlist: object) {
    state.playlist = playlist
  },
}

export default mutations
