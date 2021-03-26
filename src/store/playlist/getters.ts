import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State } from './index'

// getters types
export type Getters = {
  getPlaylist(state: State): object
}

// getters
const getters: GetterTree<State, RootState> & Getters = {
  getPlaylist: state => state.playlist,
}

export default getters
