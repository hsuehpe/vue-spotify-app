import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { State } from './index'

describe('auth module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('app actions', async() => {
    await actions.SET_NOT_FOUND(testContext, true)
    expect(testContext.commit).toHaveBeenCalledWith('SET_NOT_FOUND', true)
  })

  it('app mutations', async() => {
    const state = {
      notFound: false,
    }

    mutations.SET_NOT_FOUND(state, true)

    expect(state).toEqual({
      notFound: true,
    })
  })

  it('auth getters', () => {
    const state = {
      notFound: true,
    }

    const notFound = getters.notFound(state)

    expect(notFound).toEqual(true)
  })
})
