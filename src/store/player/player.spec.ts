import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { State } from './index'

describe('player module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('player actions', async() => {
    await actions.INIT(testContext)
    expect(testContext.commit).toHaveBeenCalledWith('INIT')
  })

  // it('player mutations', async() => {
  //   const state = {
  //     notFound: false,
  //   }

  //   mutations.SET_NOT_FOUND(state, true)

  //   expect(state).toEqual({
  //     notFound: true,
  //   })
  // })

  // it('player getters', () => {
  //   const state = {
  //     notFound: true,
  //   }

  //   const notFound = getters.notFound(state)

  //   expect(notFound).toEqual(true)
  // })
})
