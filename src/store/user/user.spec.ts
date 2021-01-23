import { ActionContext, Commit, Dispatch, GetterTree } from 'vuex'
import { State as RootState } from '../index'
import usersApi from '/~/api/spotify/users'
import playlistsApi from '/~/api/spotify/playlists'
import actions from './actions'
import mutations, { MutationTypes } from './mutations'
import getters from './getters'
import { State } from './index'

describe('user module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      getters: {
        getPlaylists: () => {
          return {
            limit: 100,
            offset: 0,
            total: 200,
          }
        },
      },
    } as ActionContext<State, RootState>
  })

  it('user actions: GET_USER_PROFILE', async() => {
    usersApi.getUserProfile = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        display_name: 'hsueh',
        email: 'abc@gmail.com',
      },
    }))
    await actions.GET_USER_PROFILE(testContext)
    expect(testContext.commit).toHaveBeenCalled()
  })

  it('user actions: GET_CURRENT_USER_PLAYLISTS', async() => {
    playlistsApi.getCurrentUserPlaylists = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        uri: 'abc123',
        type: 'playlist',
        tracks: [],
      },
    }))
    await actions.GET_CURRENT_USER_PLAYLISTS(testContext, 100)
    expect(testContext.commit).toHaveBeenCalled()
  })

  it('user actions: CLEAR_USER_PLAYLISTS', async() => {
    actions.CLEAR_USER_PLAYLISTS(testContext)
    expect(testContext.commit).toBeCalledWith(MutationTypes.CLEAR_PLAYLISTS)
  })

  it('user mutations', async() => {
    const state = {
      profile: {},
      playlists: {
        items: [],
      },
    }

    mutations.SET_PROFILE(state, {
      display_name: 'hsueh',
      email: 'abc@gmail.com',
    })

    expect(state).toEqual({
      playlists: {
        items: [],
      },
      profile: {
        display_name: 'hsueh',
        email: 'abc@gmail.com',
      },
    })

    mutations.SET_PLAYLISTS(state, {
      items: [
        {
          uri: 'abc123',
          type: 'playlist',
          tracks: [],
        },
      ],
      offset: 0,
      total: 1,
      limit: 100,
    })

    expect(state).toEqual({
      playlists: {
        items: [
          {
            uri: 'abc123',
            type: 'playlist',
            tracks: [],
          },
        ],
        offset: 0,
        total: 1,
        limit: 100,
      },
      profile: {
        display_name: 'hsueh',
        email: 'abc@gmail.com',
      },
    })

    mutations.CLEAR_PLAYLISTS(state)
    expect(state).toEqual({
      playlists: {},
      profile: {
        display_name: 'hsueh',
        email: 'abc@gmail.com',
      },
    })
  })

  it('user getters', () => {
    const state = {
      profile: {
        display_name: 'hsueh',
        email: 'abc@gmail.com',
      },
      playlists: {
        items: [
          {
            uri: 'abc123',
            type: 'playlist',
            tracks: [],
          },
        ],
        offset: 0,
        total: 1,
        limit: 100,
      },
    }

    const getProfile = getters.getProfile(state)
    const getPlaylists = getters.getPlaylists(state)

    expect(getProfile).toEqual({
      display_name: 'hsueh',
      email: 'abc@gmail.com',
    })

    expect(getPlaylists).toEqual({
      items: [
        {
          uri: 'abc123',
          type: 'playlist',
          tracks: [],
        },
      ],
      offset: 0,
      total: 1,
      limit: 100,
    })
  })
})
