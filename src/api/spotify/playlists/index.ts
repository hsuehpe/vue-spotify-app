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
}
