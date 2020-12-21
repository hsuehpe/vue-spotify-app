import { mount, shallowMount } from '@vue/test-utils'
import App from './App.vue'

describe('Component App', () => {
  test('contain class', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.classes()).toContain('px-4')
  })
})
