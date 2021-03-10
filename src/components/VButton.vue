<template>
  <button :class="elClass" @click="props['on-click']">
    <slot />
  </button>
</template>

<script setup="props" lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  'on-click': {
    required: true,
  },
  'is-black': {
    default: false,
  },
})

const elClass = computed(() => ['btn', { black: props['is-black'] }])

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
