import request from './request'

// https://developer.spotify.com/documentation/web-api/reference/#category-artists
export default {
  /**
   * Get an Artist
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param {string} id - The Spotify ID of the artist.
   * @returns {object} - artist
   */
  getArtist(id: string|string[]) {
    return request.get(`artists/${id}`)
  },

  /**
   * Get an Artist's Top Tracks
   * Get Spotify catalog information about an artist’s top tracks by country.
   * @param {string} id - The Spotify ID for the artist
   * @param {string} market - An ISO 3166-1 alpha-2 country code or the string from_token. Synonym for country.
   */
  getArtistTopTracks(id: string|string[], market: string) {
    return request.get(`artists/${id}/top-tracks`, {
      params: {
        market,
      },
    })
  },

  /**
   * Get an Artist's Albums
   * Get Spotify catalog information about an artist’s albums.
   * @param {string} id - The Spotify ID for the artist.
   * @param {string} [include_groups] - A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. Valid values are:
      - album
      - single
      - appears_on
      - compilation
      For example: include_groups=album,single.
   * @param {number} [offset=0] - The index of the first album to return. Default: 0 (i.e., the first album). Use with limit to get the next set of albums.
   * @param {number} [limit=20] - The number of album objects to return. Default: 20. Minimum: 1. Maximum: 50. For example: limit=2
   * @param {string} [market] - Synonym for country. An ISO 3166-1 alpha-2 country code or the string
   */
  getArtistAlbums(id: string|string[], include_groups?: string, offset = 0, limit = 50, market?: string) {
    return request.get(`artists/${id}/albums`, {
      params: {
        include_groups,
        limit,
        offset,
        market,
      },
    })
  },
}
