import request from './request'

// https://developer.spotify.com/documentation/web-api/reference/#category-browse
export default {
  /**
   * Get All New Releases
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @param {number} [offset=0] - The index of the first item to return. Default: 0 (the first object). Use with limit to get the next set of items.
   * @param {number} [limit=20] - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {string} [country] - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
   * @returns {object} - albums object
   */
  getNewReleases(offset?: number, limit?: number, country?: string) {
    return request.get('browse/new-releases', {
      params: {
        limit,
        offset,
        country,
      },
    })
  },

  /**
   * Get All Categories
   * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   * @param {number} [offset=0] - The index of the first item to return. Default: 0 (the first object). Use with limit to get the next set of categories.
   * @param {number} [limit=20] - The maximum number of categories to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param {string} [country] - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want to narrow the list of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant.
   * @param {string} [locale] - The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore. For example: es_MX
   * @returns {Array<object>} - array of category objects
   */
  getCategories(offset?: number, limit?: number, country?: string, locale?: string) {
    return request.get('browse/categories', {
      params: {
        limit,
        offset,
        country,
        locale,
      },
    })
  },

  /**
   * Get a Category's Playlists
   * Get a list of Spotify playlists tagged with a particular category.
   * @param {string} categoryID - The Spotify category ID for the category.
   * @param {string} [country] - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter to ensure that the category exists for a particular country.
   * @param {number} [offset=0] - The index of the first item to return. Default: 0 (the first object). Use with limit to get the next set of categories.
   * @param {number} [limit=20] - The maximum number of categories to return. Default: 20. Minimum: 1. Maximum: 50.
   * @returns {object} - playlist objects
   */
  getCategoryPlaylists(categoryID: string, offset?: number, limit?: number, country?: string) {
    return request.get(`browse/categories/${categoryID}/playlists`, {
      params: {
        category_id: categoryID,
        limit,
        offset,
        country,
      },
    })
  },
}
