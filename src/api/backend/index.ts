import request from './request'

// get url to authenticate the user
// const getAuthURL = ({ protocol, host }: any) => backend({
//   method: 'get',
//   url: '/getAuthURL',
//   params: {
//     redirectURI: `${protocol}//${host}/login`,
//   },
// })

const getAuthURL = ({ protocol, host }: any) => {
  const res = request.get('getAuthURL', {
    params: {
      redirectURI: `${protocol}//${host}/login`,
    },
  })
  return res
}

const getAccessToken = ({ code }: any) => {
  const res = request.get('getToken', {
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
