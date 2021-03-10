<template>
  <div class="py-4">
    <h2 :class="titleCls">
      {{ title }}
    </h2>
  </div>
</template>

<script setup="props" lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  small: {
    type: Boolean,
    default: false,
  },
})

const titleCls = computed(() => (props.small) ? 'mt-8 mb-0 mx-4 text-xl' : 'mt-8 mb-0 mx-4 text-3xl')
</script>
