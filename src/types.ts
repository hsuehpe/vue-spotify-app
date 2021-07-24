export interface CoverImg {
  url: string
}

export interface Followers {
  href: object|null
  total: number
}

export interface Artist {
  external_urls: object
  href: string
  id: string
  name: string
  type: string
  uri: string
  images?: Array<object>
  followers?: Followers
}

export interface Image {
  url: string
  width: number
  height: number
}

export interface Album {
  album_type: string
  external_urls: object
  uri: string
  name: string
  type: string
  artists: Array<Artist>
  href: string
  id: string
  images: Array<Image>
  release_date: string
  release_date_precision: string
  total_tracks: number
}

export interface AlbumCollection {
  album: Album
  added_at: string
}

export interface Track {
  name: string
  id: string
  album: Album
  artists: Array<Artist>
  uri: string
  explicit: boolean
  duration_ms: number
}

export interface TracksTableItem {
  track: Track
  added_at: number
}

export interface Tracks {
  total: number
  offset: number
  limit: number
  items: Array<TracksTableItem>
}

export interface User {
  images: Array<Image>
  display_name: string
}

export interface PlaylistItem {
  id: string
  uri: string
  images: Array<Image>
  name: string
  type: string
}

export interface SearchAlbums {
  next: string
  offset: number
  limit: number
  items: Array<Album> | []
}

export interface SearchArtists {
  next: string
  offset: number
  limit: number
  items: Array<Artist> | []
}

export interface SearchTracks {
  next: string
  offset: number
  limit: number
  items: Array<Track> | []
}

export interface SearchPlaylists {
  next: string
  offset: number
  limit: number
  items: Array<PlaylistItem> | []
}

export interface SearchResult {
  albums: SearchAlbums
  artists: SearchArtists
  tracks: SearchTracks
  playlists: SearchPlaylists
}
