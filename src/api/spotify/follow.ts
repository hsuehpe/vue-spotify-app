import request from './request'

export default {

  /**
   * Follow Artists or Users
   * Add the current user as a follower of one or more artists or other Spotify users.
   * @param {string} type - The ID type: either artist or user.
   * @param {string} ids - A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
   */
  followArtist(type: string, ids: string) {
    return request.put('me/following', {
      params: {
        type,
        ids,
      },
    })
  },

  /**
   * Unfollow Artists or Users
   * Remove the current user as a follower of one or more artists or other Spotify users.
   * @param {string} type - The ID type: either artist or user.
   * @param {string} ids - A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
   */
  unfollowArtist(type: string, ids: string) {
    return request.delete('me/following', {
      params: {
        type,
        ids,
      },
    })
  },

  /**
   * Check if Users Follow a Playlist
   * Check to see if one or more Spotify users are following a specified playlist.
   * @param {string} playlistID - The Spotify ID of the playlist.
   * @param {string} ids - A comma-separated list of Spotify User IDs ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.
   * @returns {boolean}
  */
  checkIfUserFollowPlaylist(playlistID: string, ids: string) {
    return request.get(
      `playlists/${playlistID}/followers/contains`,
      {
        params: {
          ids,
        },
      },
    )
  },

  /**
   * Follow a Playlist
   * Add the current user as a follower of a playlist.
   * @param {string} playlistID - The Spotify ID of the playlist. Any playlist can be followed, regardless of its public/private status, as long as you know its playlist ID.
   */
  followPlaylist(playlistID: string) {
    return request({
      method: 'put',
      url: `playlists/${playlistID}/followers`,
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  /**
   * Unfollow Playlist
   * Remove the current user as a follower of a playlist.
   * @param {string} playlistID - The Spotify ID of the playlist that is to be no longer followed.
   */
  unfollowPlaylist(playlistID: string) {
    return request.delete(
      `playlists/${playlistID}/followers`,
    )
  },

  /**
   * Get User's Followed Artists
   * @param {string} type - The ID type: currently only artist is supported.
   * @param {number} [limit=20] - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {string} [after] - The last artist ID retrieved from the previous request.
   * @returns {object} - artists
   */
  getFollowedArtists(limit?: number, after?: string) {
    return request.get('me/following?type=artist', {
      params: {
        limit,
        after,
      },
    })
  },
}
