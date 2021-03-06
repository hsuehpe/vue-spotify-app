import request from './request'

export default {
  /**
   * Get a User's Profile
   * Get public profile information about a Spotify user.
   * @param {string} userID - The user’s Spotify user ID.
   * @returns {object} - user object (https://developer.spotify.com/documentation/web-api/reference/#object-publicuserobject)
   */
  getUserProfile(userID: string) {
    if (userID)
      return request.get(`users/${userID}`)
    else
      return request.get('me')
  },
}
