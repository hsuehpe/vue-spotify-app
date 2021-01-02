import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import backend from '../../api/backend'
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

  it('auth actions', async() => {
    const payload = {
      code: 'abcde',
    }
    backend.getAccessToken = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: 'abced',
    }))
    await actions.GET_TOKEN(testContext, payload)
    expect(testContext.commit).toHaveBeenCalledWith('SET_CREDENTIALS', 'abced')
  })

  it('auth mutations', async() => {
    const state = {
      accessToken: '',
      refreshToken: '',
      expiryTime: '',
    }

    mutations.SET_CREDENTIALS(state, {
      accessToken: 'abcde',
      refreshToken: 'abcde',
      expiryTime: 'ererer',
    })

    expect(state).toEqual({
      accessToken: 'abcde',
      refreshToken: 'abcde',
      expiryTime: 'ererer',
    })
  })

  it('auth getters', () => {
    const state = {
      accessToken: 'aaaaa',
      refreshToken: 'bbbbb',
      expiryTime: '11212',
    }

    const accessToken = getters.getAccessToken(state)
    const refreshToken = getters.getRefreshToken(state)
    const expiryTime = getters.getExpiryTime(state)

    expect(accessToken).toEqual('aaaaa')
    expect(refreshToken).toEqual('bbbbb')
    expect(expiryTime).toEqual('11212')
  })
})
