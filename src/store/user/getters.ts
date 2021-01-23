import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State, Playlists } from './index'

// getters types
export type Getters = {
  getProfile(state: State): object
  getPlaylists(state: State): Playlists
}

// getters
const getters: GetterTree<State, RootState> & Getters = {
  getProfile: state => state.profile,
  getPlaylists: state => state.playlists,
}

export default getters
