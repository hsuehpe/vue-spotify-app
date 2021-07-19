import { ActionContext, ActionTree } from 'vuex'
import backend from '../../api/backend'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'

export enum ActionTypes {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
  LOG_OUT = 'LOG_OUT',
  SET_CREDENTIALS = 'SET_CREDENTIALS'
}

// Actions contracts
export interface Actions {
  [ActionTypes.LOGIN_USER](state: State): void
  [ActionTypes.LOG_OUT](): void
  [ActionTypes.REFRESH_TOKEN](context: ActionContext<State, RootState>): void
  [ActionTypes.SET_CREDENTIALS](context: ActionContext<State, RootState>, payload: any): void
}

const actions: ActionTree<State, RootState> & Actions = {
  /**
  * Redirect the user to external spotify login page.
  * @param
  */
  async [ActionTypes.LOGIN_USER]({ state }: any) {
    const { protocol, host } = window.location

    if (!state.accessToken) {
      const res = await backend.getAuthURL({ protocol, host })
      window.location.href = res.data.url
    }
  },

  [ActionTypes.LOG_OUT]() {
    const script = document.createElement('script')

    script.src = 'https://www.spotify.com/logout/'
    const appEl = document.getElementById('app')
    if (appEl) appEl.appendChild(script)

    window.localStorage.clear()
    window.sessionStorage.clear()

    setTimeout(() => {
      location.reload()
    }, 1000)
  },

  async [ActionTypes.REFRESH_TOKEN]({ commit, state }) {
    try {
      if (state.refreshToken) {
        const response = await backend.refreshAccessToken(state.refreshToken)
        const accessToken = response.data.access_token
        commit(MutationTypes.SET_ACCESS_TOKEN, accessToken)
      }
    }
    catch (e) {
      console.log(e)
    }
  },

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  async [ActionTypes.SET_CREDENTIALS]({ commit }: ActionContext<State, RootState>, { code }: any) {
    if (code) {
      const res = await backend.getAccessToken({ code })
      commit(MutationTypes.SET_ACCESS_TOKEN, res.data.accessToken)
      commit(MutationTypes.SET_REFRESH_TOKEN, res.data.refreshToken)
      commit(MutationTypes.SET_EXPIRY_TIME, res.data.expiryTime)
    }
  },
}

export default actions
