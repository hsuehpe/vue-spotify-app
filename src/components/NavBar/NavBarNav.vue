<template>
  <div v-if="user" ref="root" class="absolute z-10 right-0 mr-8">
    <div class="flex items-center h-10">
      <router-link :to="{ name: 'user', params: { id: user.id } }" class="dark:text-white text-sm hover:underline">
        {{ user.display_name }}
      </router-link>
      <button class="cursor-pointer text-base" @click="onClick">
        <icon icon="ic-outline-expand-more" />
      </button>
      <transition name="fade mt-8">
        <ul v-show="isVisible" class="text-sm absolute top-8">
          <li class="list-item" @click="onAccountClick">
            Account
          </li>
          <li class="list-item" @click="onHelpClick">
            Help
          </li>
          <li class="list-item" @click="logout">
            Logout
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import Icon from '/~/components/Icon.vue'
import { ActionTypes as AuthActionTypes } from '/~/store/auth/actions'

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const isVisible = ref(false)
    const root = ref()

    const store = useStore()
    const getters = store.getters
    const user = getters['UserModule/getProfile']

    const clickOutEvent = (e: { target: any }) => {
      const el = root.value
      if (el) {
        const $dropdown = el.children[0]
        if (e.target !== $dropdown && !$dropdown.contains(e.target)) close()
      }
    }

    const onClick = () => {
      isVisible.value = !isVisible.value

      if (isVisible.value)
        setTimeout(() => document.addEventListener('click', clickOutEvent), 100)
      else
        close()
    }

    const close = () => {
      isVisible.value = false
      document.removeEventListener('click', clickOutEvent)
    }

    const onAccountClick = () => {
      window.open(
        'https://www.spotify.com/tw/account/overview/?utm_source=play&utm_campaign=wwwredirect',
        '_blank',
      )
    }

    const onHelpClick = () => {
      window.open(
        'https://support.spotify.com/tw/?utm_campaign=wwwredirect&utm_source=play',
        '_blank',
      )
    }

    const logout = () => {
      store.dispatch(`AuthModule/${AuthActionTypes.LOG_OUT}`)
    }

    return {
      onClick,
      onAccountClick,
      onHelpClick,
      logout,
      user,
      isVisible,
      root,
    }
  },
})

</script>

<style lang="postcss" scoped>
.list-item {
  padding: 10px;
  cursor: pointer;
  background: #000;
  color: #fff;
}
</style>
