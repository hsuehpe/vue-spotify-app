<template>
  <button :class="elClass" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    isBlack: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const elClass = computed(() => ['btn', { black: props.isBlack }])

    return {
      elClass,
    }
  },
})
</script>

<style lang="postcss" scoped>
  .btn {
    min-width: 130px;
    border-radius: 50px;
    background: #1db954;
    @apply py-2 px-9 text-white leading-none tracking-wider uppercase cursor-pointer outline-none;

    &:hover {
      background: #2cc863;
    }

    &.black {
      background: #181818;
      @apply border border-white;

      &:hover {
        background: #363636;
      }
    }

    .font {
      @apply text-xs font-semibold;
    }
  }
</style>
