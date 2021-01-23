<template>
  <div class="flex text-4xl">
    <a class="cursor-pointer" @click="onPrevClick">
      <Icon icon="ic-outline-navigate-before" />
    </a>
    <a class="cursor-pointer" @click="onNextClick">
      <Icon icon="ic:outline-navigate-next" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const onNextClick = () => {
  router.forward()
}

const onPrevClick = () => {
  router.back()
}

</script>
