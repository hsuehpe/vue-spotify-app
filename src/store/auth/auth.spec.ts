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
      data: {
        accessToken: 'abcde',
        refreshToken: 'abcde',
        expiryTime: 'abcde',
      },
    }))
    await actions.SET_CREDENTIALS(testContext, payload)
    expect(testContext.commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_REFRESH_TOKEN', 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_EXPIRY_TIME', 'abcde')
  })

  it('auth mutations', async() => {
    const state = {
      accessToken: '',
      refreshToken: '',
      expiryTime: '',
    }

    mutations.SET_ACCESS_TOKEN(state, 'abcde')
    mutations.SET_REFRESH_TOKEN(state, 'abcde')
    mutations.SET_EXPIRY_TIME(state, 'ererer')

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
