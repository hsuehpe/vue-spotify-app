import request from './request'

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

const refreshAccessToken = (refreshToken: string) => {
  const res = request.get('refreshToken', {
    params: {
      token: refreshToken,
    },
  })

  return res
}

export default {
  getAuthURL,
  getAccessToken,
  refreshAccessToken,
}

// // refresh access token
// export const refreshAccessToken = () => backend({
//   method: 'get',
//   url: '/refreshToken',
//   params: {
//     token: refreshToken,
//   },
// });
