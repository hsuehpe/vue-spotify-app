import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { State } from './index'

describe('library module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('library actions: SAVE_TRACK', () => {
    actions.SAVE_TRACK(testContext, 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_SAVED_TRACK', 'abcde')
  })

  it('library actions: REMOVE_TRACK', () => {
    actions.REMOVE_TRACK(testContext, 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_REMOVED_TRACK', 'abcde')
  })

  it('library mutations', () => {
    const state = {
      lastSavedTrack: '',
      lastRemovedTrack: '',
    }

    mutations.SET_SAVED_TRACK(state, 'abcde')
    expect(state).toEqual({
      lastSavedTrack: 'abcde',
      lastRemovedTrack: '',
    })

    mutations.SET_REMOVED_TRACK(state, 'abcde')
    expect(state).toEqual({
      lastSavedTrack: '',
      lastRemovedTrack: 'abcde',
    })
  })

  it('library getters', () => {
    const state = {
      lastSavedTrack: 'abcde',
      lastRemovedTrack: 'ccccc',
    }

    const getSavedTrack = getters.getSavedTrack(state)
    const getRemovedTrack = getters.getRemovedTrack(state)

    expect(getSavedTrack).toEqual('abcde')
    expect(getRemovedTrack).toEqual('ccccc')
  })
})
