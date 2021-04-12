<template>
  <div class="py-4">
    <h2 :class="titleCls">
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const titleCls = computed(() => (props.small) ? 'mt-8 mb-0 mx-4 text-xl' : 'mt-8 mb-0 mx-4 text-3xl')

    return {
      titleCls,
    }
  },
})
</script>
