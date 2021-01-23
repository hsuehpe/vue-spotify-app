import { MutationTree } from 'vuex'
import { State, Playlists } from './index'

// mutations enum
export enum MutationTypes {
  SET_PROFILE = 'SET_PROFILE',
  SET_PLAYLISTS = 'SET_PLAYLISTS',
  CLEAR_PLAYLISTS = 'CLEAR_PLAYLISTS'
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_PROFILE](state: S, profile: object): void
  [MutationTypes.SET_PLAYLISTS](state: S, playlists: object): void
  [MutationTypes.CLEAR_PLAYLISTS](state: S): void
}

const mutations: MutationTree<State> & Mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  [MutationTypes.SET_PROFILE](state: State, profile: object) {
    state.profile = profile
  },
  [MutationTypes.SET_PLAYLISTS](state: State, playlists: Playlists) {
    if (state.playlists) {
      if (playlists.limit) state.playlists.limit = playlists.limit
      state.playlists.offset = playlists.offset
      state.playlists.next = playlists.next
      state.playlists.total = playlists.total
      state.playlists.items.push(...playlists.items)
    }
    else {
      state.playlists = playlists
    }
  },
  [MutationTypes.CLEAR_PLAYLISTS](state: State) {
    state.playlists = {}
  },
}

export default mutations
