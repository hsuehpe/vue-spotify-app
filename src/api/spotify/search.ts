import request from './request'

// https://developer.spotify.com/documentation/web-api/reference/#category-search
export default {

  /**
   * Search for an Item
   * Get Spotify Catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword string.
   * @param {string} q - Search query keywords and optional field filters and operators. For example: q=roadhouse%20blues.
   * @param {string} type - A comma-separated list of item types to search across. Valid types are: album , artist, playlist, track, show and episode. Search results include hits from all the specified item types. For example: q=name:abacab&type=album,track returns both albums and tracks with “abacab” included in their name.
   * @param {string} [market] - An ISO 3166-1 alpha-2 country code or the string from_token. If a country code is specified, only content that is playable in that market is returned.
   * @param {number} [limit=20] - Maximum number of results to return. Default: 20, Minimum: 1, Maximum: 50
   * @param {number} [offset=0] - The index of the first result to return. Default: 0 (the first result). Maximum offset (including limit): 1,000. Use with limit to get the next page of search results.
   * @param {string} [include_external] - Possible values: audio If include_external=audio is specified the response will include any relevant audio content that is hosted externally. By default external content is filtered out from responses.
   */
  search(
    q: string,
    type = 'album,artist,playlist,track',
    offset?: number,
    limit?: number,
    market?: string,
    include_external?: string,
  ) {
    return request.get('search', {
      params: {
        q,
        type,
        limit,
        offset,
        market,
        include_external,
      },
    })
  },
}
