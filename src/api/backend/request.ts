import axios from 'axios'
import { backendBaseUrl } from '/~/config'

const request = axios.create({
  baseURL: backendBaseUrl,
})

export default request
