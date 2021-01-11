import request from './request'

const createRequestInterceptor = (store: any) => {
  request.interceptors.request.use((config) => {
    if (store.getters['AuthModule/getAccessToken'])
      config.headers.common.Authorization = `Bearer ${store.getters['AuthModule/getAccessToken']}`

    return config
  }, null)
}

const createResponseInterceptor = (store: any) => {
  request.interceptors.response.use(null, async(error) => {
    const { status, data } = error.response

    if (status === 403 && data.error.reason === 'PREMIUM_REQUIRED') {
      store.dispatch('notification/add', {
        type: 'warning',
        message: 'You need to have premium account.',
      })
    }

    // reject promise if custom error
    if (status !== 401)
      return Promise.reject(error)

    try {
      store.dispatch('AuthModule/refreshToken')
    }
    catch (e) {
      console.error(e)
    }
  })
}

const plugin = (store: any) => {
  createRequestInterceptor(store)
  createResponseInterceptor(store)
}

export default plugin
