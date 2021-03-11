import request from './request'

export default {
  /**
   * Get User's Saved Tracks
   * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
   * @param {number} [offset=0] - The index of the first object to return. Default: 0 (i.e., the first object). Use with limit to get the next set of objects.
   * @param {number} [limit=20] - The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {string} [market] - An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   */
  getTracks(offset = 0, limit = 50, market: string) {
    return request.get('me/tracks', {
      params: {
        limit,
        offset,
        market,
      },
    })
  },

  /**
   * Get User's Saved Albums
   * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
   * @param {number} [limit=20] - The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {number} [offset=0] - The index of the first object to return. Default: 0 (i.e., the first object). Use with limit to get the next set of objects.
   * @param {string} [market] - An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   */
  getAlbums(offset = 0, limit = 50, market: string) {
    return request.get('me/albums', {
      params: {
        limit,
        offset,
        market,
      },
    })
  },

  /**
   * Check User's Saved Tracks
   * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
   * @param {string} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
   */
  checkUserSavedTracks(ids: string) {
    return request.get('me/tracks/contains', {
      params: {
        ids,
      },
    })
  },

  /**
   * Save Tracks for User
   * Save one or more tracks to the current user’s ‘Your Music’ library.
   * @param {string} ids - A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
   */
  saveTracks(ids: string) {
    return request.put('me/tracks', {
      ids,
    })
  },

  /**
   * Remove User's Saved Tracks
   * Remove one or more tracks from the current user’s ‘Your Music’ library.
   * @param {string} ids - A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
   */
  removeTracks(ids: string) {
    return request.delete('me/tracks', {
      data: {
        ids,
      },
    })
  },
}
