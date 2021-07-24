<template>
  <div class="nav-view">
    <ul class="nav">
      <router-link
        v-for="(item, index) in links"
        v-show="item.isVisible ? item.isVisible : true"
        :key="index"
        :to="item.to"
        exact
        tag="li"
        class="nav-item"
        active-class="--active"
      >
        {{ item.name }}
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    links: {
      type: Array as any,
      default: () => [],
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
  .nav-view {
    @apply p-2;

    .nav {
      @apply flex py-4 px-0 justify-center;
    }

    .nav-item {
      @apply relative my-0 mx-4 text-base uppercase cursor-pointer;

      &.--active {
        &:after {
          @apply absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-2 w-12 h-1 bg-[#1db954] content-[''];
        }
      }
    }
  }
</style>
