<template>
  <div class="not-found-view">
    <div class="not-found-view__content">
      <p>
        Sorry, it looks like we couldn't find what you're looking for.
        <br>
        Click the button below to go back.
      </p>
      <div @click="backButton">
        Return to the app
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const backButton = () => {
  router.push('/')
}
</script>
