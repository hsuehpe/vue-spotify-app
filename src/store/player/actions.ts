import { ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'
import playerApi from '/~/api/spotify/player'

export enum ActionTypes {
  INIT = 'INIT',
  SET_PLAYBACK = 'SET_PLAYBACK',
  SET_PLAYBACK_CONTEXT = 'SET_PLAYBACK_CONTEXT'
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any
    Spotify: any
  }
}

// Actions contracts
export interface Actions {
  [ActionTypes.INIT](context: ActionContext<State, RootState>): void
  [ActionTypes.SET_PLAYBACK](context: ActionContext<State, RootState>): void
  [ActionTypes.SET_PLAYBACK_CONTEXT](context: ActionContext<State, RootState>, playbackContext: object): void
}

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.INIT]({ commit, dispatch, rootGetters }: ActionContext<State, RootState>) {
    window.onSpotifyWebPlaybackSDKReady = () => {}

    async function waitForSpotifyWebPlaybackSDKToLoad(): Promise<any> {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve(window.Spotify)
        }
        else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify)
          }
        }
      })
    }

    // async function waitUntilUserHasSelectedPlayer(sdk: { getCurrentState: () => any }) {
    //   return new Promise((resolve) => {
    //     const interval = setInterval(async() => {
    //       const state = await sdk.getCurrentState()
    //       if (state !== null) {
    //         resolve(state)
    //         clearInterval(interval)
    //       }
    //     })
    //   })
    // }

    (async() => {
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad()
      const token = rootGetters['AuthModule/getAccessToken']

      // eslint-disable-next-line
      const player = new Player({
        name: 'Vue Spotify Web Player',
        getOAuthToken: (cb: (arg0: any) => void) => {
          cb(token)
        },
      })

      // Error handling
      player.addListener('initialization_error', ({ message }: any) => {
        console.error(message)
      })

      player.addListener('authentication_error', ({ message }: any) => {
        console.error(message)
        dispatch('AuthModule/LOGIN_USER', null, { root: true })
      })

      player.addListener('account_error', ({ message }: any) => {
        console.error(message)
      })

      player.addListener('playback_error', ({ message }: any) => {
        console.error(message)
      })

      // Playback status updates
      player.addListener('player_state_changed', (state: any) => {
        if (state) {
          dispatch('SET_PLAYBACK_CONTEXT', state)
          dispatch('SET_PLAYBACK')
        }
      })

      // Ready
      player.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id)
        commit('SET_DEVICE_ID', device_id)

        playerApi.transferUsersPlayback([device_id], true)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Connect to the player!
      await player.connect()

      // if (connected)
      //   await waitUntilUserHasSelectedPlayer(player)
    })()
  },

  async [ActionTypes.SET_PLAYBACK]({ commit }: ActionContext<State, RootState>) {
    try {
      const response = await playerApi.getCurrentPlayback()
      commit(MutationTypes.SET_PLAYBACK, response.data)
    }
    catch (e) {
      console.log(e)
    }
  },

  async [ActionTypes.SET_PLAYBACK_CONTEXT]({ commit }: ActionContext<State, RootState>, playerContext: any) {
    commit(MutationTypes.SET_PLAYBACK_CONTEXT, playerContext)
  },
}

export default actions
