import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State } from './index'

// getters types
export type Getters = {
  getAccessToken(state: State): string
  getRefreshToken(state: State): string
  getExpiryTime(state: State): string
}

// getters
const getters: GetterTree<State, RootState> & Getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getExpiryTime: state => state.expiryTime,
}

export default getters
