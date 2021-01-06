import { ActionContext, ActionTree } from 'vuex'
import backend from '../../api/backend'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'

export enum ActionTypes {
  GET_TOKEN = 'GET_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
  LOG_OUT = 'LOG_OUT'
}

// Actions contracts
export interface Actions {
  [ActionTypes.LOGIN_USER](state: State): void
  [ActionTypes.LOG_OUT](): void
  [ActionTypes.GET_TOKEN](context: ActionContext<State, RootState>, payload: any): void
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
      console.log(res.data.url)
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

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  async [ActionTypes.GET_TOKEN]({ commit }: ActionContext<State, RootState>, { code }: any) {
    if (code) {
      const res = await backend.getAccessToken({ code })
      commit(MutationTypes.SET_CREDENTIALS, res.data)
    }
  },

  /**
  * Call the backend api and refresh the access token.
  */
  // [ActionTypes.REFRESH_TOKEN]({ getters, commit }) {
  //   const refreshToken = getters.getRefreshToken

  //   if (refreshToken) {
  //     refreshAccessToken({ refreshToken }).then((res) => {
  //       commit('SET_CREDENTIALS', res.data)
  //     }).catch((err) => {
  //       commit('app/SET_NOTICE', {
  //         action: 'add',
  //         type: 'error',
  //         message: `Error: ${err}`,
  //       }, { root: true })
  //     })
  //   }
  // },
}

export default actions
