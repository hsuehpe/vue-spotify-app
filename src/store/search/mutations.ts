import { MutationTree } from 'vuex'
import { State } from './index'
import { SearchResult, SearchAlbums, SearchArtists, SearchPlaylists, SearchTracks } from '/~/types'

export enum MutationTypes {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  REQUEST_SEARCH = 'REQUEST_SEARCH',
  REQUEST_SEARCH_SUCCESS = 'REQUEST_SEARCH_SUCCESS',
  REQUEST_SEARCH_ERROR = 'REQUEST_SEARCH_ERROR',
  REQUEST_GET_ALBUMS = 'REQUEST_GET_ALBUMS',
  REQUEST_GET_ALBUMS_SUCCESS = 'REQUEST_GET_ALBUMS_SUCCESS',
  REQUEST_GET_ALBUMS_ERROR = 'REQUEST_GET_ALBUMS_ERROR',
  REQUEST_GET_ARTISTS = 'REQUEST_GET_ARTISTS',
  REQUEST_GET_ARTISTS_SUCCESS = 'REQUEST_GET_ARTISTS_SUCCESS',
  REQUEST_GET_ARTISTS_ERROR = 'REQUEST_GET_ARTISTS_ERROR',
  REQUEST_GET_PLAYLISTS = 'REQUEST_GET_PLAYLISTS',
  REQUEST_GET_PLAYLISTS_SUCCESS = 'REQUEST_GET_PLAYLISTS_SUCCESS',
  REQUEST_GET_PLAYLISTS_ERROR = 'REQUEST_GET_PLAYLISTS_ERROR',
  REQUEST_GET_TRACKS = 'REQUEST_GET_TRACKS',
  REQUEST_GET_TRACKS_SUCCESS = 'REQUEST_GET_TRACKS_SUCCESS',
  REQUEST_GET_TRACKS_ERROR = 'REQUEST_GET_TRACKS_ERROR',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_SEARCH_QUERY](state: S, data: string): void
  [MutationTypes.REQUEST_SEARCH](state: S): void
  [MutationTypes.REQUEST_SEARCH_SUCCESS](state: S, data: SearchResult): void
  [MutationTypes.REQUEST_SEARCH_ERROR](state: S, error: object): void
  [MutationTypes.REQUEST_GET_ALBUMS](state: S): void
  [MutationTypes.REQUEST_GET_ALBUMS_SUCCESS](state: S, data: object): void
  [MutationTypes.REQUEST_GET_ALBUMS_ERROR](state: S, error: object): void
  [MutationTypes.REQUEST_GET_ARTISTS](state: S): void
  [MutationTypes.REQUEST_GET_ARTISTS_SUCCESS](state: S, data: object): void
  [MutationTypes.REQUEST_GET_ARTISTS_ERROR](state: S, error: object): void
  [MutationTypes.REQUEST_GET_PLAYLISTS](state: S): void
  [MutationTypes.REQUEST_GET_PLAYLISTS_SUCCESS](state: S, data: object): void
  [MutationTypes.REQUEST_GET_PLAYLISTS_ERROR](state: S, error: object): void
  [MutationTypes.REQUEST_GET_TRACKS](state: S): void
  [MutationTypes.REQUEST_GET_TRACKS_SUCCESS](state: S, data: object): void
  [MutationTypes.REQUEST_GET_TRACKS_ERROR](state: S, error: object): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SEARCH_QUERY](state: State, data) {
    state.query = data
  },
  [MutationTypes.REQUEST_SEARCH](state: State) {
    state.isLoading = true
  },
  [MutationTypes.REQUEST_SEARCH_SUCCESS](state: State, data: SearchResult) {
    state.result = data
    state.albums = data.albums
    state.artists = data.artists
    state.playlists = data.playlists
    state.tracks = data.tracks
    state.isLoading = false
  },
  [MutationTypes.REQUEST_SEARCH_ERROR](state: State, error) {
    state.isLoading = false
    state.error = error
  },
  [MutationTypes.REQUEST_GET_ALBUMS](state: State) {
    state.albumsIsLoading = true
  },
  [MutationTypes.REQUEST_GET_ALBUMS_SUCCESS](state: State, data: { albums: SearchAlbums }) {
    state.albumsIsLoading = false
    state.albums = {
      ...data.albums,
      items: [...state.albums.items, ...data.albums.items],
    }
  },
  [MutationTypes.REQUEST_GET_ALBUMS_ERROR](state: State, error) {
    state.albumsIsLoading = false
    state.albumsError = error
  },
  [MutationTypes.REQUEST_GET_ARTISTS](state: State) {
    state.artistsIsLoading = true
  },
  [MutationTypes.REQUEST_GET_ARTISTS_SUCCESS](state: State, data: { artists: SearchArtists }) {
    state.artistsIsLoading = false
    state.artists = {
      ...data.artists,
      items: [...state.artists.items, ...data.artists.items],
    }
  },
  [MutationTypes.REQUEST_GET_ARTISTS_ERROR](state: State, error) {
    state.artistsIsLoading = false
    state.artistsError = error
  },
  [MutationTypes.REQUEST_GET_PLAYLISTS](state: State) {
    state.playlistsIsLoading = true
  },
  [MutationTypes.REQUEST_GET_PLAYLISTS_SUCCESS](state: State, data: { playlists: SearchPlaylists }) {
    state.playlistsIsLoading = false
    state.playlists = {
      ...data.playlists,
      items: [...state.playlists.items, ...data.playlists.items],
    }
  },
  [MutationTypes.REQUEST_GET_PLAYLISTS_ERROR](state: State, error) {
    state.playlistsIsLoading = false
    state.playlistsError = error
  },
  [MutationTypes.REQUEST_GET_TRACKS](state: State) {
    state.tracksIsLoading = true
  },
  [MutationTypes.REQUEST_GET_TRACKS_SUCCESS](state: State, data: { tracks: SearchTracks }) {
    state.tracksIsLoading = false
    state.tracks = {
      ...data.tracks,
      items: [...state.tracks.items, ...data.tracks.items],
    }
  },
  [MutationTypes.REQUEST_GET_TRACKS_ERROR](state: State, error) {
    state.tracksIsLoading = false
    state.tracksError = error
  },
}

export default mutations
