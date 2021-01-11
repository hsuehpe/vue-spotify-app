<template>
  <div>
  </div>
</template>>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
const getters = store.getters
const getProfile = getters['UserModule/getProfile']
console.log(getProfile)

</script>
