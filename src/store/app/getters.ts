import { GetterTree } from 'vuex'
import { State as RootState } from '../index'
import { State } from './index'

// getters types
export type Getters = {
  notFound(state: State): boolean
}

// getters
const getters: GetterTree<State, RootState> & Getters = {
  notFound: state => state.notFound,
}

export default getters
