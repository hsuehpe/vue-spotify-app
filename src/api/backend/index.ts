import axios from 'axios'

const baseURL = 'http://0.0.0.0:3000/vue-spotify-app/v1/'

// get url to authenticate the user
// const getAuthURL = ({ protocol, host }: any) => backend({
//   method: 'get',
//   url: '/getAuthURL',
//   params: {
//     redirectURI: `${protocol}//${host}/login`,
//   },
// })

const getAuthURL = ({ protocol, host }: any) => {
  const res = axios.get(`${baseURL}/getAuthURL`, {
    params: {
      redirectURI: `${protocol}//${host}/login`,
    },
  })
  return res
}

const getAccessToken = ({ code }: any) => {
  const res = axios.get(`${baseURL}/getToken`, {
    params: {
      code,
    },
  })

  return res
}

export default {
  getAuthURL,
  getAccessToken,
}

// // refresh access token
// export const refreshAccessToken = () => backend({
//   method: 'get',
//   url: '/refreshToken',
//   params: {
//     token: refreshToken,
//   },
// });
