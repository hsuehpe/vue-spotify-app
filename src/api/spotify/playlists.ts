import request from './request'

export default {
  /**
   * Get a Playlist
   * Get a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
   * @param {string} playlistID - The Spotify ID for the playlist.
   * @param {string} [fields] -  Filters for the query: a comma-separated list of the fields to return
   * @returns {Array<object>} - array of playlist objects
   */
  getPlaylist(playlistID: string, fields: string) {
    return request.get(`/playlists/${playlistID}`, {
      params: {
        fields,
      },
    })
  },
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

  /**
   * Get a Playlist's Items
   * Get full details of the items of a playlist owned by a Spotify user.
   * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlists-tracks
   * @param {string} playlistID - The Spotify ID for the playlist.
   * @param {string} market - An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   * @param {string} [fields] - Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned.
   * @param {number} [limit=100] - The maximum number of items to return. Default: 100. Minimum: 1. Maximum: 100.
   * @param {number} [offset=0] - The index of the first item to return. Default: 0 (the first object).
   * @param {string} [additional_types=track] - A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
   */
  getPlaylistsTracks(playlistID: string | string[], offset: number, limit: number, fields?: string) {
    return request.get(`playlists/${playlistID}/tracks`, {
      params: {
        fields,
        limit,
        offset,
      },
    })
  },
}
