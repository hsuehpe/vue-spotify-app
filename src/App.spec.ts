import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import App from './App.vue'

describe('Component App', () => {
  test('have access token then login user', () => {
    const store = createStore({
      modules: {
        AuthModule: {
          state: {
            accessToken: 'abcde',
            refreshToken: '',
            expiryTime: '',
          },
        },
      },
    })

    store.dispatch = jest.fn()

    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(store.dispatch).toHaveBeenCalledWith('LOGIN_USER', undefined)
  })
})
