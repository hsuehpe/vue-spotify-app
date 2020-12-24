import { ActionContext, ActionTree } from 'vuex'
import { getAccessToken } from '../../api/backend'
import { State as RootState } from '../index'
import { Mutations, MutationTypes } from './mutations'
import { State } from './index'

export enum ActionTypes {
  GET_TOKEN = 'GET_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

// Actions contracts
export interface Actions {
  [ActionTypes.GET_TOKEN](
    { commit }: AugmentedActionContext,
    payload: { code: string },
  ): void
}

const actions: ActionTree<State, RootState> & Actions = {
  /**
  * Redirect the user to external spotify login page.
  * @param
  */
  // loginUser({ state }) {
  //   const { protocol, host } = window.location;

  //   if (!state.accessToken) {
  //     getAuthURL({ protocol, host }).then((res) => {
  //       window.location.href = res.data.url;
  //     });
  //   }
  // },

  /**
  * Call the backend api and get an access token.
  * @param { object } payload The function payload.
  * @param { string } payload.code The code returned from spotify login page.
  */
  [ActionTypes.GET_TOKEN]({ commit }, { code }) {
    if (code) {
      getAccessToken({ code }).then((res: any) => {
        commit(MutationTypes.SET_CREDENTIALS, res.data)
      }).catch((err: any) => {
        console.log(err)
      })
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
