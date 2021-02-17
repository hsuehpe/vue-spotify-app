import request from './../request'

export default {
  nextTrack(device_id: string) {
    return request.post('me/player/next', {
      device_id,
    })
  },

  previousTrack(device_id: string) {
    return request.post('me/player/previous', {
      device_id,
    })
  },

  pause(device_id?: string) {
    return request.put('me/player/pause', {
      device_id,
    })
  },

  play(context_uri?: string, offset?: number, uris?: any) {
    return request({
      method: 'put',
      url: 'me/player/play',
      data: {
        offset,
        uris,
        ...(context_uri && { context_uri }),
      },
    })
  },

  volume(volume_percent: number, device_id: string) {
    return request({
      method: 'put',
      url: '/me/player/volume',
      params: {
        volume_percent,
        device_id,
      },
    })
  },

  shuffle(state: object, device_id: string) {
    return request({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !state,
        device_id,
      },
    })
  },

  repeat(state: object, device_id: string) {
    return request({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state,
        device_id,
      },
    })
  },

  seekToPosition(position_ms: number, device_id: string) {
    return request({
      method: 'put',
      url: '/me/player/seek',
      params: {
        position_ms,
        device_id,
      },
    })
  },

  getUserDevices() {
    return request.get('me/player/devices')
  },

  getCurrentPlayback() {
    return request.get('me/player')
  },

  transferUsersPlayback(device_ids: Array<string>, play = false) {
    return request.put('me/player', {
      device_ids,
      play,
    })
  },
}
