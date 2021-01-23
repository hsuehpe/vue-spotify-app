import { ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'

export enum ActionTypes {
  SET_NOT_FOUND = 'SET_NOT_FOUND',
  INIT = 'INIT',
}

// Actions contracts
export interface Actions {
  [ActionTypes.SET_NOT_FOUND](context: ActionContext<State, RootState>, status: boolean): void
  [ActionTypes.INIT](context: ActionContext<State, RootState>): void
}

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SET_NOT_FOUND]({ commit }: ActionContext<State, RootState>, status) {
    commit(MutationTypes.SET_NOT_FOUND, status)
  },
  [ActionTypes.INIT]({ dispatch, rootGetters }: ActionContext<State, RootState>) {
    if (rootGetters['AuthModule/getAccessToken'])
      dispatch('UserModule/GET_USER_PROFILE', null, { root: true })
  },
}

export default actions
