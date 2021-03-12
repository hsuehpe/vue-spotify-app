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
  [MutationTypes.SET_NOT_FOUND](state: State, status: boolean) {
    state.notFound = status
  },
}

export default mutations
