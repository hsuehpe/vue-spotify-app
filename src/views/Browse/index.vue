<template>
  <div>Browse</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('browse mounted')
    })
  },
})
</script>
