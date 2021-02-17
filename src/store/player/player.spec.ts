import { ActionContext, Commit, Dispatch } from 'vuex'
import { State as RootState } from '../index'
import playerApi from '/~/api/spotify/player'
import actions from './actions'
import mutations, { MutationTypes } from './mutations'
import getters from './getters'
import { State } from './index'

describe('player module', () => {
  let testContext: ActionContext<State, RootState>
  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
    } as ActionContext<State, RootState>
  })

  it('player actions: SET_PLAYBACK', async() => {
    const data = { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 }
    playerApi.getCurrentPlayback = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data,
      }))
    await actions.SET_PLAYBACK(testContext)
    expect(testContext.commit).toHaveBeenCalledWith(MutationTypes.SET_PLAYBACK, { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 })
  })

  it('player actions: SET_PLAYBACK_CONTEXT', async() => {
    actions.SET_PLAYBACK_CONTEXT(testContext, {
      context: {
        uri: 'spotify:album:xxx',
        metadata: {},
      },
      disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false, // `seeking` will be set to `true` when playing an
        // ad track.
      },
      paused: false,
      position: 0,
      repeat_mode: 0,

      // once-repeat is 1 and full repeat is 2.
      shuffle: false,
    })

    expect(testContext.commit).toHaveBeenCalledWith('SET_PLAYBACK_CONTEXT', {
      context: {
        uri: 'spotify:album:xxx',
        metadata: {},
      },
      disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false, // `seeking` will be set to `true` when playing an
        // ad track.
      },
      paused: false,
      position: 0,
      repeat_mode: 0,
      // once-repeat is 1 and full repeat is 2.
      shuffle: false,
    })
  })

  it('player mutations', async() => {
    const state = {
      deviceID: '',
      playback: null,
      playbackContext: null,
    }

    mutations.SET_PLAYBACK(state, { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 })
    expect(state).toEqual({
      deviceID: '',
      playback: { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 },
      playbackContext: null,
    })

    mutations.SET_PLAYBACK_CONTEXT(state, {
      context: {
        uri: 'spotify:album:xxx',
        metadata: {},
      },
      disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false, // `seeking` will be set to `true` when playing an
      // ad track.
      },
      paused: false,
      position: 0,
      repeat_mode: 0,
      // once-repeat is 1 and full repeat is 2.
      shuffle: false,
    })

    expect(state).toEqual({
      deviceID: '',
      playback: { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 },
      playbackContext: {
        context: {
          uri: 'spotify:album:xxx',
          metadata: {},
        },
        disallows: {
          pausing: false,
          peeking_next: false,
          peeking_prev: false,
          resuming: false,
          seeking: false,
          skipping_next: false,
          skipping_prev: false, // `seeking` will be set to `true` when playing an
        // ad track.
        },
        paused: false,
        position: 0,
        repeat_mode: 0,
        // once-repeat is 1 and full repeat is 2.
        shuffle: false,
      },
    })
  })

  it('player getters', () => {
    const state = {
      deviceID: 'ABCDE',
      playback: { context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 },
      playbackContext: {
        context: {
          uri: 'spotify:album:xxx',
          metadata: {},
        },
        disallows: {
          pausing: false,
          peeking_next: false,
          peeking_prev: false,
          resuming: false,
          seeking: false,
          skipping_next: false,
          skipping_prev: false, // `seeking` will be set to `true` when playing an
        // ad track.
        },
        paused: false,
        position: 0,
        repeat_mode: 0,
        // once-repeat is 1 and full repeat is 2.
        shuffle: false,
      },
    }

    const deviceID = getters.getDeviceID(state)
    const playback = getters.getPlayback(state)
    const playbackContext = getters.getPlaybackContext(state)

    expect(deviceID).toEqual('ABCDE')
    expect(playback).toEqual({ context: { external_urls: { spotify: 'http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv' }, href: 'https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv', type: 'playlist', uri: 'spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv' }, currently_playing_type: 'track', device: { id: '3f228e06c8562e2f439e22932da6c3231715ed53', is_active: false, is_restricted: false, name: 'Xperia Z5 Compact', type: 'Smartphone', volume_percent: 54 }, is_playing: true, item: {}, progress_ms: '44272', repeat_state: 'off', shuffle_state: false, timestamp: 1490252122574 })
    expect(playbackContext).toEqual({
      context: {
        uri: 'spotify:album:xxx',
        metadata: {},
      },
      disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false, // `seeking` will be set to `true` when playing an
      // ad track.
      },
      paused: false,
      position: 0,
      repeat_mode: 0,
      // once-repeat is 1 and full repeat is 2.
      shuffle: false,
    })
  })
})
