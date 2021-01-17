<template>
  <div v-if="user" class="absolute z-10 right-0 mr-8">
    <div class="flex items-center h-10">
      <router-link :to="{ name: 'user', params: { id: user.id } }" class="dark:text-white text-sm hover:underline">
        {{ user.display_name }}
      </router-link>
      <button class="cursor-pointer text-base" @click="onClick">
        <Icon icon="ic-outline-expand-more" />
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

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes as AuthActionTypes } from '/~/store/auth/actions'
const isVisible = ref(false)

const store = useStore()
const getters = store.getters
const user = getters['UserModule/getProfile']

console.log(isVisible)

const onClick = () => {
  isVisible.value = !isVisible.value
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

</script>

<style>
.list-item {
  padding: 10px;
  cursor: pointer;
  background: #000;
  color: #fff;
}
</style>
