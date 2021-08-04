import { ActionContext, ActionTree } from 'vuex'
import { State as RootState } from '../index'
import { MutationTypes } from './mutations'
import { State } from './index'
import searchApi from '/~/api/spotify/search'
import { SearchResult, SearchAlbums, SearchArtists, SearchPlaylists, SearchTracks } from '/~/types'

export enum ActionTypes {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  REQUEST_SEARCH = 'REQUEST_SEARCH',
  REQUEST_SEARCH_SUCCESS = 'REQUEST_SEARCH_SUCCESS',
  REQUEST_SEARCH_ERROR = 'REQUEST_SEARCH_ERROR',
  SEARCH = 'SEARCH',
  REQUEST_GET_ALBUMS = 'REQUEST_GET_ALBUMS',
  REQUEST_GET_ALBUMS_SUCCESS = 'REQUEST_GET_ALBUMS_SUCCESS',
  REQUEST_GET_ALBUMS_ERROR = 'REQUEST_GET_ALBUMS_ERROR',
  GET_ALBUMS = 'GET_ALBUMS',
  REQUEST_GET_ARTISTS = 'REQUEST_GET_ARTISTS',
  REQUEST_GET_ARTISTS_SUCCESS = 'REQUEST_GET_ARTISTS_SUCCESS',
  REQUEST_GET_ARTISTS_ERROR = 'REQUEST_GET_ARTISTS_ERROR',
  GET_ARTISTS = 'GET_ARTISTS',
  REQUEST_GET_PLAYLISTS = 'REQUEST_GET_PLAYLISTS',
  REQUEST_GET_PLAYLISTS_SUCCESS = 'REQUEST_GET_PLAYLISTS_SUCCESS',
  REQUEST_GET_PLAYLISTS_ERROR = 'REQUEST_GET_PLAYLISTS_ERROR',
  GET_PLAYLISTS = 'GET_PLAYLISTS',
  REQUEST_GET_TRACKS = 'REQUEST_GET_TRACKS',
  REQUEST_GET_TRACKS_SUCCESS = 'REQUEST_GET_TRACKS_SUCCESS',
  REQUEST_GET_TRACKS_ERROR = 'REQUEST_GET_TRACKS_ERROR',
  GET_TRACKS = 'GET_TRACKS',
}

export interface Actions {
  [ActionTypes.SET_SEARCH_QUERY](context: ActionContext<State, RootState>, query: string): void
  [ActionTypes.REQUEST_SEARCH](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_SEARCH_SUCCESS](context: ActionContext<State, RootState>, data: SearchResult): void
  [ActionTypes.REQUEST_SEARCH_ERROR](context: ActionContext<State, RootState>, error: object): void
  [ActionTypes.SEARCH](context: ActionContext<State, RootState>, query: string): void
  [ActionTypes.REQUEST_GET_ALBUMS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_ALBUMS_SUCCESS](context: ActionContext<State, RootState>, data: SearchAlbums): void
  [ActionTypes.REQUEST_GET_ALBUMS_ERROR](context: ActionContext<State, RootState>, error: object): void
  [ActionTypes.GET_ALBUMS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_ARTISTS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_ARTISTS_SUCCESS](context: ActionContext<State, RootState>, data: SearchArtists): void
  [ActionTypes.REQUEST_GET_ARTISTS_ERROR](context: ActionContext<State, RootState>, error: object): void
  [ActionTypes.GET_ARTISTS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_PLAYLISTS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_PLAYLISTS_SUCCESS](context: ActionContext<State, RootState>, data: SearchPlaylists): void
  [ActionTypes.REQUEST_GET_PLAYLISTS_ERROR](context: ActionContext<State, RootState>, error: object): void
  [ActionTypes.GET_PLAYLISTS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_TRACKS](context: ActionContext<State, RootState>): void
  [ActionTypes.REQUEST_GET_TRACKS_SUCCESS](context: ActionContext<State, RootState>, data: SearchTracks): void
  [ActionTypes.REQUEST_GET_TRACKS_ERROR](context: ActionContext<State, RootState>, error: object): void
  [ActionTypes.GET_TRACKS](context: ActionContext<State, RootState>): void
}

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.SET_SEARCH_QUERY]({ commit }: ActionContext<State, RootState>, query: string) {
    commit(MutationTypes.SET_SEARCH_QUERY, query)
  },
  [ActionTypes.REQUEST_SEARCH]({ commit }: ActionContext<State, RootState>) {
    commit(MutationTypes.REQUEST_SEARCH)
  },
  [ActionTypes.REQUEST_SEARCH_SUCCESS]({ commit }: ActionContext<State, RootState>, data: SearchResult) {
    commit(MutationTypes.REQUEST_SEARCH_SUCCESS, data)
  },
  [ActionTypes.REQUEST_SEARCH_ERROR]({ commit }: ActionContext<State, RootState>, error: object) {
    commit(MutationTypes.REQUEST_SEARCH_ERROR, error)
  },
  async [ActionTypes.SEARCH]({ dispatch }: ActionContext<State, RootState>, query: string) {
    dispatch(ActionTypes.REQUEST_SEARCH)
    dispatch(ActionTypes.SET_SEARCH_QUERY, query)

    try {
      const res = await searchApi.search(query)
      if (res && res.data)
        dispatch(ActionTypes.REQUEST_SEARCH_SUCCESS, res.data)
    }
    catch (e) {
      dispatch(ActionTypes.REQUEST_SEARCH_ERROR, e)
    }
  },
  // Albums
  [ActionTypes.REQUEST_GET_ALBUMS]({ commit }: ActionContext<State, RootState>) {
    commit(MutationTypes.REQUEST_GET_ALBUMS)
  },
  [ActionTypes.REQUEST_GET_ALBUMS_SUCCESS]({ commit }: ActionContext<State, RootState>, data: SearchAlbums) {
    commit(MutationTypes.REQUEST_GET_ALBUMS_SUCCESS, data)
  },
  [ActionTypes.REQUEST_GET_ALBUMS_ERROR]({ commit }: ActionContext<State, RootState>, error: object) {
    commit(MutationTypes.REQUEST_GET_ALBUMS_ERROR, error)
  },
  async [ActionTypes.GET_ALBUMS]({ dispatch, state: { albums, query } }: ActionContext<State, RootState>) {
    dispatch(ActionTypes.REQUEST_GET_ALBUMS)

    try {
      if (albums.next) {
        const offset = albums.offset + albums.limit
        const res = await searchApi.search(
          query,
          'album',
          offset,
        )
        if (res && res.data)
          dispatch(ActionTypes.REQUEST_GET_ALBUMS_SUCCESS, res.data)
      }
    }
    catch (e) {
      dispatch(ActionTypes.REQUEST_GET_ALBUMS_ERROR)
    }
  },
  // Artists
  [ActionTypes.REQUEST_GET_ARTISTS]({ commit }: ActionContext<State, RootState>) {
    commit(MutationTypes.REQUEST_GET_ARTISTS)
  },
  [ActionTypes.REQUEST_GET_ARTISTS_SUCCESS]({ commit }: ActionContext<State, RootState>, data: SearchArtists) {
    commit(MutationTypes.REQUEST_GET_ARTISTS_SUCCESS, data)
  },
  [ActionTypes.REQUEST_GET_ARTISTS_ERROR]({ commit }: ActionContext<State, RootState>, error: object) {
    commit(MutationTypes.REQUEST_GET_ARTISTS_ERROR, error)
  },
  async [ActionTypes.GET_ARTISTS]({ dispatch, state: { artists, query } }: ActionContext<State, RootState>) {
    dispatch(ActionTypes.REQUEST_GET_ARTISTS)

    try {
      if (artists.next) {
        const offset = artists.offset + artists.limit
        const res = await searchApi.search(
          query,
          'artist',
          offset,
        )

        if (res && res.data)
          dispatch(ActionTypes.REQUEST_GET_ARTISTS_SUCCESS, res.data)
      }
    }
    catch (e) {
      dispatch(ActionTypes.REQUEST_GET_ARTISTS_ERROR, e)
    }
  },
  // Playlists
  [ActionTypes.REQUEST_GET_PLAYLISTS]({ commit }: ActionContext<State, RootState>) {
    commit(MutationTypes.REQUEST_GET_PLAYLISTS)
  },
  [ActionTypes.REQUEST_GET_PLAYLISTS_SUCCESS]({ commit }: ActionContext<State, RootState>, data: SearchPlaylists) {
    commit(MutationTypes.REQUEST_GET_PLAYLISTS_SUCCESS, data)
  },
  [ActionTypes.REQUEST_GET_PLAYLISTS_ERROR]({ commit }: ActionContext<State, RootState>, error: object) {
    commit(MutationTypes.REQUEST_GET_PLAYLISTS_ERROR, error)
  },
  async [ActionTypes.GET_PLAYLISTS]({ dispatch, state: { playlists, query } }: ActionContext<State, RootState>) {
    dispatch(MutationTypes.REQUEST_GET_PLAYLISTS)

    try {
      if (playlists.next) {
        const offset = playlists.offset + playlists.limit
        const res = await searchApi.search(
          query,
          'playlist',
          offset,
        )

        if (res && res.data)
          dispatch(ActionTypes.REQUEST_GET_PLAYLISTS_SUCCESS, res.data)
      }
    }
    catch (e) {
      dispatch(MutationTypes.REQUEST_GET_PLAYLISTS_ERROR, e)
    }
  },
  // Tracks
  [ActionTypes.REQUEST_GET_TRACKS]({ commit }: ActionContext<State, RootState>) {
    commit(MutationTypes.REQUEST_GET_TRACKS)
  },
  [ActionTypes.REQUEST_GET_TRACKS_SUCCESS]({ commit }: ActionContext<State, RootState>, data: SearchTracks) {
    commit(MutationTypes.REQUEST_GET_TRACKS_SUCCESS, data)
  },
  [ActionTypes.REQUEST_GET_TRACKS_ERROR]({ commit }: ActionContext<State, RootState>, error: object) {
    commit(MutationTypes.REQUEST_GET_TRACKS_ERROR, error)
  },
  async [ActionTypes.GET_TRACKS]({ dispatch, state: { tracks, query } }: ActionContext<State, RootState>) {
    dispatch(ActionTypes.REQUEST_GET_TRACKS)

    try {
      if (tracks.next) {
        const offset = tracks.offset + tracks.limit
        const res = await searchApi.search(
          query,
          'track',
          offset,
        )

        if (res && res.data)
          dispatch(ActionTypes.REQUEST_GET_TRACKS_SUCCESS, res.data)
      }
    }
    catch (e) {
      dispatch(ActionTypes.REQUEST_GET_TRACKS_ERROR, e)
    }
  },
}

export default actions
