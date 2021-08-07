import path from 'path'
import http from 'http'
import express from 'express'
import httpStatus from 'http-status-codes'
import randomstring from 'randomstring'
import SpotifyWebApi from 'spotify-web-api-node'
import history from 'connect-history-api-fallback'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()
const app = express()
app.set('port', process.env.PORT || 8080)

// initialize spotify api instance
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID, // your client id goes here
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET, // your client secret goes here
})

// spotify api scopes
const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-read-private',
  'user-read-email',
  'user-follow-modify',
  'user-follow-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
]

// router middleware
router.use((req: any, res: any, next: any) => {
  // website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  // request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // pass to next layer of middleware
  next()
})

// getAuthURL endpoint
router.route('/getAuthURL').get((req: any, res: any) => {
  const redirectURI = (typeof req.query.redirectURI === 'string') ? req.query.redirectURI : 'http://localhost:8080/login'
  const state = randomstring.generate()

  spotifyApi.setRedirectURI(redirectURI)
  res.json({ url: spotifyApi.createAuthorizeURL(scopes, state) })
})

// getToken endpoint
router.route('/getToken').get((req: any, res: any) => {
  const code = (typeof req.query.code === 'string') ? req.query.code : ''

  try {
    spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
          refreshToken: data.body.refresh_token,
        })
      }).catch((err) => {
        res.send(err)
      })
  }
  catch (e) {
    res.status(httpStatus.BAD_REQUEST).send('Bad Request')
  }
})

// refreshToken endpoint
router.route('/refreshToken').get((req: any, res: any) => {
  const refreshToken = (typeof req.query.token === 'string') ? req.query.token : ''

  try {
    spotifyApi.setRefreshToken(refreshToken)
    spotifyApi.refreshAccessToken()
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
        })
      }).catch((err) => {
        res.send(err)
      })
  }
  catch (e) {
    res.status(httpStatus.BAD_REQUEST).send('Bad Request')
  }
})

// register router
app.use('/vue-spotify-app/v1', router)
app.use(history())
// register static folder
app.use(express.static(path.join(__dirname, '../../dist')))

const server = http.createServer(app)

server.listen(app.get('port'), async() => {
  console.warn('node server launched')
})
