import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_CREDENTIALS = 'SET_CREDENTIALS',
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_CREDENTIALS](state: S, payload: any): void
}

const mutations: MutationTree<State> & Mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  [MutationTypes.SET_CREDENTIALS](state: State, payload: any) {
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
    state.expiryTime = payload.expiryTime
  },
}

export default mutations
