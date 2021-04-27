<template>
  <div class="flex text-4xl">
    <a class="cursor-pointer" @click="onPrevClick">
      <icon icon="ic-outline-navigate-before" />
    </a>
    <a class="cursor-pointer" @click="onNextClick">
      <icon icon="ic:outline-navigate-next" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '/~/components/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
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
