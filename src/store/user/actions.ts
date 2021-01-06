import { ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'
import usersApi from '/~/api/spotify/users'
import playlistsApi from '/~/api/spotify/playlists'

export enum ActionTypes {
  GET_USER_PROFILE = 'GET_USER_PROFILE',
  GET_CURRENT_USER_PLAYLISTS = 'GET_CURRENT_USER_PLAYLISTS',
  CLEAR_USER_PLAYLISTS = 'CLEAR_USER_PLAYLISTS'
}

// Actions contracts
export interface Actions {
  [ActionTypes.GET_USER_PROFILE](context: ActionContext<State, RootState>): void
  [ActionTypes.GET_CURRENT_USER_PLAYLISTS](context: ActionContext<State, RootState>, limit: number): void
  [ActionTypes.CLEAR_USER_PLAYLISTS](context: ActionContext<State, RootState>): void
}

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_USER_PROFILE]({ commit }: ActionContext<State, RootState>) {
    const res = await usersApi.getUserProfile(null)
    commit(MutationTypes.SET_PROFILE, res.data)
  },
  async [ActionTypes.GET_CURRENT_USER_PLAYLISTS]({ getters, commit }: ActionContext<State, RootState>, limit = 50) {
    let offset = 0
    if (getters.getPlaylists)
      offset = getters.getPlaylists.limit + getters.getPlaylists.offset

    if (!(getters.getPlaylists.total < offset)) {
      try {
        const response = await playlistsApi.getCurrentUserPlaylists(limit, offset)
        commit(MutationTypes.SET_PLAYLISTS, response.data)
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  [ActionTypes.CLEAR_USER_PLAYLISTS]({ commit }) {
    commit(MutationTypes.CLEAR_PLAYLISTS)
  },
}

export default actions
