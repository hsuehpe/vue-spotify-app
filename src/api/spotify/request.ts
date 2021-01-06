import axios from 'axios'
import { spotifyBaseUrl } from '/~/config'

const request = axios.create({
  baseURL: spotifyBaseUrl,
})

export default request
