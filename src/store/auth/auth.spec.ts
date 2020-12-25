import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import actions from './actions'
import { State } from './index'

describe('testing auth', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('testing auth module', () => {
    const code = 'abced'
    actions.GET_TOKEN(testContext, code)
    expect(testContext.commit).toHaveBeenCalled()
  })
})
