import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_DEVICE_ID = 'SET_DEVICE_ID',
  SET_PLAYBACK = 'SET_PLAYBACK',
  SET_PLAYBACK_CONTEXT = 'SET_PLAYBACK_CONTEXT'
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_DEVICE_ID](state: S, deviceID: string): void
  [MutationTypes.SET_PLAYBACK](state: S, playback: object): void
  [MutationTypes.SET_PLAYBACK_CONTEXT](state: S, playbackContext: object): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_DEVICE_ID](state: State, deviceID: string) {
    state.deviceID = deviceID
  },
  [MutationTypes.SET_PLAYBACK](state: State, playback: object) {
    state.playback = playback
  },
  [MutationTypes.SET_PLAYBACK_CONTEXT](state: State, playbackContext: object) {
    state.playbackContext = playbackContext
  },
}

export default mutations
