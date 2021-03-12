import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State } from './index'

export type Getters = {
  getSavedTrack(state: State): string
  getRemovedTrack(state: State): string
}

const getters: GetterTree<State, RootState> & Getters = {
  getSavedTrack: state => state.lastSavedTrack,
  getRemovedTrack: state => state.lastRemovedTrack,
}

export default getters
