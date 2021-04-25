<template>
  <div class="infinite-loader">
    <slot />
    <slot
      v-if="data.loading"
      name="loader"
    >
      <Icon icon="mdi-light:loading" class="loading" />
    </slot>
    <div
      ref="trigger"
      style="width: 100%; height: 1px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  props: {
    triggerDistance: {
      type: Number,
      default: 200,
    },
    id: {
      type: String,
      default: '',
    },
    more: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const trigger = ref(null)
    const data = reactive({
      scrollingContext: null,
      ready: false,
      loading: false,
    })

    onMounted(async() => {
      window.__observer = new IntersectionObserver(async(entries) => {
        console.log(entries[0])
        if (entries[0].isIntersecting && !data.loading) {
          data.loading = true
          await props.more()
          data.loading = false
          emit('loaded')
        }
      })

      if (trigger.value) {
        console.log('do observe')
        window.__observer.observe(trigger.value)
      }
    })

    onUnmounted(() => {
      if (window.__observer) window.__observer.disconnect()
    })

    return {
      data,
      trigger,
    }
  },
})
</script>

<style lang="postcss" scoped>
.infinite-loader {
  @apply relative overflow-x-hidden overflow-y-scroll h-full pb-10;
}

.loading {
  @apply absolute text-white text-8xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin duration-300;
}
</style>
