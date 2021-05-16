import request from './request'

export default {
  /**
   * Skip User’s Playback To Next Track
   * Skips to next track in the user’s queue.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  nextTrack(deviceID?: string) {
    return request.post('me/player/next', {
      deviceID,
    })
  },

  /**
   * Skip User’s Playback To Previous Track
   * Skips to previous track in the user’s queue.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  previousTrack(deviceID?: string) {
    return request.post('me/player/previous', {
      deviceID,
    })
  },

  /**
   * Pause a User's Playback
   * Pause playback on the user’s account.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  pause(deviceID?: string) {
    return request.put('me/player/pause', {
      deviceID,
    })
  },

  /**
   * Start/Resume a User's Playback
   * Start a new context or resume current playback on the user’s active device.
   * @param {string} [contextUri]
   * @param {object} [offset]
   * @param {Array<string>} [uris] - Array of URIs
   * @param {number} [positionMs]
   */
  play(contextUri?: string | null, offset?: object, uris?: Array<any>) {
    return request({
      method: 'put',
      url: 'me/player/play',
      data: {
        offset,
        uris,
        context_uri: contextUri,
      },
    })
  },

  /**
   * Set Volume For User's Playback
   * Set the volume for the user’s current playback device.
   * @param {number} volumePercent - The volume to set. Must be a value from 0 to 100 inclusive.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  volume(volumePercent: number, deviceID?: string) {
    return request({
      method: 'put',
      url: '/me/player/volume',
      params: {
        volumePercent,
        deviceID,
      },
    })
  },

  /**
   * Toggle Shuffle For User’s Playback
   * Toggle shuffle on or off for user’s playback.
   * @param {boolean} state -  true : Shuffle user’s playback. false : Do not shuffle user’s playback.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  shuffle(state: boolean, deviceID?: string) {
    return request({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !state,
        deviceID,
      },
    })
  },

  /**
   * Set Repeat Mode On User’s Playback
   * Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.
   * @param {string} state - track, context or off. track will repeat the current track. context will repeat the current context. off will turn repeat off.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  repeat(state: string, device_id?: string) {
    return request({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state,
        device_id,
      },
    })
  },

  /**
   * Seek To Position In Currently Playing Track
   * Seeks to the given position in the user’s currently playing track.
   * @param {number} positionMs - The position in milliseconds to seek to. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
   * @param {string} [deviceID] - The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
   */
  seekToPosition(position_ms: number, device_id?: string) {
    return request({
      method: 'put',
      url: '/me/player/seek',
      params: {
        position_ms,
        device_id,
      },
    })
  },

  /**
   * Get a User's Available Devices
   * Get information about a user’s available devices.
   * @returns {object} - device objects
   */
  getUserDevices() {
    return request.get('me/player/devices')
  },

  /**
   * Get Information About The User's Current Playback
   * Get information about the user’s current playback state, including track or episode, progress, and active device.
   */
  getCurrentPlayback() {
    return request.get('me/player')
  },

  /**
   * Transfer a User's Playback
   * Transfer playback to a new device and determine if it should start playing.
   * @param {Array<string>} deviceIDs - A JSON array containing the ID of the device on which playback should be started/transferred.
   * For example:{device_ids:["74ASZWbe4lXaubB36ztrGX"]}
   Note: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request
   * @param {bolean} [play] - true: ensure playback happens on new device.
  false or not provided: keep the current playback state.
   */
  transferUsersPlayback(deviceIDs: Array<string>, play = false) {
    return request.put('me/player', {
      device_ids: deviceIDs,
      play,
    })
  },
}
