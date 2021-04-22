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
