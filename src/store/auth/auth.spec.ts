import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import backend from '../../api/backend'
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

  it('testing auth action', async() => {
    const payload = {
      code: 'abcde',
    }
    backend.getAccessToken = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: 'abced',
    }))
    await actions.GET_TOKEN(testContext, payload)
    expect(testContext.commit).toHaveBeenCalledWith('SET_CREDENTIALS', 'abced')
  })
})
