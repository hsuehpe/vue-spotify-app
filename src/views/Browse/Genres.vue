<template>
  <div class="genres-view">
    <entity-header title="Genres & Moods" small="true" />
    <div class="inner">
      <div
        v-for="(item, index) in data.categories"
        :key="index"
        class="category"
      >
        <router-link :to="{ name: 'genres', params: { id: item.id } }">
          <img
            class="category-img"
            :src="item.icons[0].url"
            :alt="item.name"
          >
          <div class="category-name">
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import browseApi from '/~/api/spotify/browse'
import EntityHeader from '/~/components/EntityHeader.vue'

export default defineComponent({
  components: {
    EntityHeader,
  },
  setup() {
    const data = reactive({
      categories: {},
    })

    const getCategories = async() => {
      try {
        const res = await browseApi.getCategories()
        data.categories = res.data.categories.items
      }
      catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getCategories()
    })

    return {
      data,
    }
  },
})
</script>

<style lang="postcss" scoped>
.genres-view {
  height: calc(100vh - 14rem);

  .inner {
    @apply pt-0 pr-4 pb-0 pl-2;
  }

  .category {
    @apply relative inline-block w-1/2 p-2 align-top xl:w-1/6 lg:w-1/4 md:w-1/3;
  }

  .category-img {
    @apply w-full
  }

  .category-name {
    @apply absolute top-3/4 left-0 right-0 py-0 px-4 text-white text-base text-center;
    &:hover {
      @apply underline;
    }
  }
}
</style>
