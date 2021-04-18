import request from './request'

// https://developer.spotify.com/documentation/web-api/reference/#category-albums
export default {
  /**
   * Get Multiple Albums
   * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param {string} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
   * @param {string} [market] - An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   * @returns array contains album objects
   */
  getAlbums(ids: string, market: string) {
    return request.get('albums', {
      params: {
        ids,
        market,
      },
    })
  },

  /**
   * Get an Album
   * Get Spotify catalog information for a single album.
   * @param {string} id - The Spotify ID of the album.
   * @returns album object
   */
  getAlbum(id: string|string[]) {
    return request.get(`albums/${id}`)
  },

  /**
   * Get an Album's Tracks
   * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
   * @param {string} id - The Spotify ID of the album.
   * @param {number} [offset=0] - The index of the first track to return. Default: 0 (the first object). Use with limit to get the next set of tracks.
   * @param {number} [limit=20] - The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {string} [market] -  An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   * @returns album object
   */
  getAlbumTracks(id: string|string[], offset = 0, limit = 50, market?: string) {
    return request.get(`albums/${id}/tracks`, {
      params: {
        limit,
        offset,
        market,
      },
    })
  },
}
