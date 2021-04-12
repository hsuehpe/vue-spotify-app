import { ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'
import playlistsApi from '/~/api/spotify/playlists'

export enum ActionTypes {
  FETCH_PLAYLIST = 'FETCH_PLAYLIST'
}

export interface Actions {
  [ActionTypes.FETCH_PLAYLIST](context: ActionContext<State, RootState>, playlistID: string): void
}

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.FETCH_PLAYLIST]({ commit }: ActionContext<State, RootState>, playlistID: string) {
    try {
      const fields = 'uri, name, type, images, description, owner, followers'
      const res = await playlistsApi.getPlaylist(
        playlistID,
        fields,
      )
      commit(MutationTypes.SET_PLAYLIST, res.data)
    }
    catch (e) {
      console.log(e)
    }
  },
}

export default actions
