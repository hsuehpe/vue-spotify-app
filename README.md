## Vue Spotify App
---
### Spotify web client app built with Vue3 + Vuex + TypeScript

Valid Spotify Premium subscription is required. Otherwise, Web Playback SDK will not work.

## Feature
---
#### Authorization
* Login
* Logout
* Refresh token

#### Search
* Get Spotify Catalog information about artists, albums, tracks or playlists that match a keyword string.

#### Browse
* Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
* Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
* Get a list of Spotify playlists tagged with a particular category.

#### Artists
* Get Spotify catalog information for a single artist identified by their unique Spotify ID.
* Get Spotify catalog information about an artist’s top tracks by country.
* Get Spotify catalog information about an artist’s albums.

#### Albums
* Get Spotify catalog information for a single album.
* Get Spotify catalog information for multiple albums identified by their Spotify IDs.
* Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.

#### Playlist manipulation
* Get a user's playlists
* Create playlists

#### Follow
* Add the current user as a follower of one or more artists or other Spotify users.
* Remove the current user as a follower of one or more artists or other Spotify users.
* Check to see if one or more Spotify users are following a specified playlist.
* Add the current user as a follower of a playlist.
* Remove the current user as a follower of a playlist.
* Get User's Followed Artists

#### Your Music
* Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
* Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
* Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
* Save one or more tracks to the current user’s ‘Your Music’ library.
* Remove one or more tracks from the current user’s ‘Your Music’ library.

#### Playlists
* Get a playlist owned by a Spotify user.
* Get a list of the playlists owned or followed by the current Spotify user.
* Get a list of the playlists owned or followed by a Spotify user.
* Get full details of the items of a playlist owned by a Spotify user.

#### User
* Get detailed profile information about the current user (including the current user’s username).

#### Player
* Get a user's available devices
* Connect to another device
* Start/Resume a User's Playback
* Get the User's Currently Playing Track
* Set volume
* Skip User’s Playback To Next Track
* Skip User’s Playback To Previous Track
* Seek playback to a given position
* Toggle Shuffle For User’s Playback
* Set Repeat Mode On User’s Playback

## Read more
* [Spotify web API](https://developer.spotify.com/documentation/web-api/)
* [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)