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

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const onNextClick = () => {
      router.forward()
    }

    const onPrevClick = () => {
      router.back()
    }

    return {
      onNextClick,
      onPrevClick,
    }
  },
})

</script>
