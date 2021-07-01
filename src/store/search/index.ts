import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import { State as RootState } from '../index'
import mutations, { Mutations } from './mutations'
import actions, { Actions } from './actions'
import { SearchResult, SearchAlbums, SearchArtists, SearchPlaylists, SearchTracks } from '/~/types'

export type State = {
  query: string
  result: SearchResult
  isLoading: boolean
  error: any
  albums: SearchAlbums
  albumsIsLoading: boolean
  albumsError: any
  artists: SearchArtists
  artistsIsLoading: boolean
  artistsError: any
  playlists: SearchPlaylists
  playlistsIsLoading: boolean
  playlistsError: any
  tracks: SearchTracks
  tracksIsLoading: boolean
  tracksError: any
}

const state = {
  query: '',
  result: {
    albums: {
      items: [],
    },
    artists: {
      items: [],
    },
    playlists: {
      items: [],
    },
    tracks: {
      items: [],
    },
  },
  isLoading: false,
  error: null,
  albums: {
    items: [],
  },
  albumsIsLoading: false,
  albumsError: null,
  artists: {
    items: [],
  },
  artistsIsLoading: false,
  artistsError: null,
  playlists: {
    items: [],
  },
  playlistsIsLoading: false,
  playlistsError: null,
  tracks: {
    items: [],
  },
  tracksIsLoading: false,
  tracksError: null,
}

// setup store type
export type Store<S = State> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
}

export const SearchModule: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
}
