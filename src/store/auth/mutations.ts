import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  SET_EXPIRY_TIME = 'SET_EXPIRY_TIME'
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_ACCESS_TOKEN](state: S, token: string): void
  [MutationTypes.SET_REFRESH_TOKEN](state: S, token: string): void
  [MutationTypes.SET_EXPIRY_TIME](state: S, time: string): void
}

const mutations: MutationTree<State> & Mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  [MutationTypes.SET_ACCESS_TOKEN](state: State, token: string) {
    state.accessToken = token
  },
  [MutationTypes.SET_REFRESH_TOKEN](state: State, token: string) {
    state.refreshToken = token
  },
  [MutationTypes.SET_EXPIRY_TIME](state: State, time: string) {
    state.expiryTime = time
  },
}

export default mutations
