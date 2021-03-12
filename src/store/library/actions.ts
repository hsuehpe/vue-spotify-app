import { Action, ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'

export enum ActionTypes {
  SAVE_TRACK = 'SAVE_TRACK',
  REMOVE_TRACK = 'REMOVE_TRACK'
}

// Actions contracts
export interface Actions {
  [ActionTypes.SAVE_TRACK](context: ActionContext<State, RootState>, track: string): void
  [ActionTypes.REMOVE_TRACK](context: ActionContext<State, RootState>, track: string): void
}

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.SAVE_TRACK]({ commit }: ActionContext<State, RootState>, track) {
    commit(MutationTypes.SET_SAVED_TRACK, track)
  },
  [ActionTypes.REMOVE_TRACK]({ commit }: ActionContext<State, RootState>, track) {
    commit(MutationTypes.SET_REMOVED_TRACK, track)
  },
}

export default actions
