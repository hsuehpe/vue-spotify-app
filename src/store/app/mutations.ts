import { MutationTree } from 'vuex'
import { State } from './index'

// mutations enum
export enum MutationTypes {
  SET_NOT_FOUND = 'SET_NOT_FOUND',
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_NOT_FOUND](state: S, status: boolean): void
}

const mutations: MutationTree<State> & Mutations = {
  /**
  * Push credentials to state.
  * @param { object } payload The function payload.
  * @param { string } payload.accessToken The spotify api access token.
  * @param { string } payload.refreshToken The spotify api refresh token.
  * @param { number } payload.expiresIn The duration in seconds that the token is valid..
  */
  [MutationTypes.SET_NOT_FOUND](state: State, status: boolean) {
    state.notFound = status
  },
}

export default mutations
