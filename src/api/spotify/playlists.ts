import request from './request'

export default {
  /**
   * Get a List of Current User's Playlists
   * Get a list of the playlists owned or followed by the current Spotify user.
   * @param {number} [limit=20] - ‘The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.’
   * @param {number} [offset=0] - The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.
   * @returns {Array<object>} - array of playlist objects
   */
  getCurrentUserPlaylists(limit = 2, offset: number) {
    return request.get('me/playlists', {
      params: {
        limit,
        offset,
      },
    })
  },

  /**
   * Get a List of a User's Playlists
   * Get a list of the playlists owned or followed by a Spotify user.
   * @param {string} userID - The user’s Spotify user ID.
   * @param {number} [offset=0] - The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.
   * @param {number} [limit=20] - The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50.
   * @returns {Array<object>} - array of playlist objects
   */
  getUserPlaylists(userID: string | string[] | null, offset: number, limit: number) {
    return request.get(`users/${userID}/playlists`, {
      params: {
        limit,
        offset,
      },
    })
  },
}
