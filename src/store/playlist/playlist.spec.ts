import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { State } from './index'
import playlistsApi from '/~/api/spotify/playlists'

describe('playlist module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('playlist actions: FETCH_PLAYLIST', async() => {
    playlistsApi.getPlaylist = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        id: 'abcde',
        name: 'playlist A',
      },
    }))
    await actions.FETCH_PLAYLIST(testContext, 'abcde')
    expect(testContext.commit).toHaveBeenCalledWith('SET_PLAYLIST', {
      id: 'abcde',
      name: 'playlist A',
    })
  })

  it('playlist mutations', () => {
    const state = {
      playlist: {},
    }

    mutations.SET_PLAYLIST(state, { id: 'abcde', name: 'playlist A' })
    expect(state).toEqual({
      playlist: {
        id: 'abcde',
        name: 'playlist A',
      },
    })
  })

  it('playlist getters', () => {
    const state = {
      playlist: {
        id: 'abcde',
        name: 'playlist A',
      },
    }

    const getPlaylist = getters.getPlaylist(state)

    expect(getPlaylist).toEqual({
      id: 'abcde',
      name: 'playlist A',
    })
  })
})
