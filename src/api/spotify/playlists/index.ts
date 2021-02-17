import request from './../request'

export default {
  getCurrentUserPlaylists(limit = 2, offset: number) {
    return request.get('me/playlists', {
      params: {
        limit,
        offset,
      },
    })
  },

  getUserPlaylists(userID: string | string[] | null, offset: number, limit: number) {
    return request.get(`users/${userID}/playlists`, {
      params: {
        limit,
        offset,
      },
    })
  },
}
