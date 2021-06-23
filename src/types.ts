export interface CoverImg {
  url: string
}

export interface Followers {
  href: object
  total: number
}

export interface Artist {
  external_urls: object
  href: string
  id: string
  name: string
  type: string
  uri: string
  images: Array<object>
  followers: Followers
}

export interface Image {
  url: string
}

export interface Album {
  uri: string
  name: string
  type: string
  album_group: string
  artists: Array<Artist>
  href: string
  id: string
  images: Array<Image>
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
  explicit: string
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
