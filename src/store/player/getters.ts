import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State } from './index'

// getters types
export type Getters = {
  getDeviceID(state: State): string
  getPlayback(state: State): object
  getPlaybackContext(state: State): string
  isPlaying(state: State): boolean
}

// getters
const getters: GetterTree<State, RootState> & Getters = {
  getDeviceID: state => state.deviceID,
  getPlayback: state => state.playback,
  getPlaybackContext: state => state.playbackContext,
  isPlaying: state => state.playback.is_playing,
}

export default getters
