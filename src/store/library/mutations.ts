import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_SAVED_TRACK = 'SET_SAVED_TRACK',
  SET_REMOVED_TRACK = 'SET_REMOVED_TRACK'
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_SAVED_TRACK](state: S, track: string): void
  [MutationTypes.SET_REMOVED_TRACK](state: S, track: string): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SAVED_TRACK](state: State, track: string) {
    state.lastRemovedTrack = ''
    state.lastSavedTrack = track
  },
  [MutationTypes.SET_REMOVED_TRACK](state: State, track: string) {
    state.lastSavedTrack = ''
    state.lastRemovedTrack = track
  },
}

export default mutations
