<template>
  <infinite-loader
    :more="loadMore"
  >
    <entity-header :title="title" />
    <div v-if="data.playlists.items.length > 0" class="flex flex-wrap p-4">
      <media-object
        v-for="(item, index) in data.playlists.items"
        :id="item.id"
        :key="index"
        :uri="item.uri"
        :cover-img="item.images"
        :name="item.name"
        :type="item.type"
      />
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ActionTypes as AppActionTypes } from '/~/store/app/actions'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import MediaObject from '/~/components/MediaObject.vue'
import browseApi from '/~/api/spotify/browse'

export default defineComponent({
  components: {
    EntityHeader,
    InfiniteLoader,
    MediaObject,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      categoryID: '',
      playlists: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [],
      },
      isMore: false,
    })
    const title = computed(() => `${data.categoryID.replace('_', '')} playlists`)

    const getCategoryPlaylists = async(categoryID: string) => {
      try {
        if (data.playlists.total > data.playlists.offset) {
          const res = await browseApi.getCategoryPlaylists(
            data.categoryID,
            data.playlists.offset,
            data.playlists.limit,
          )

          const playlists = res.data.playlists

          data.playlists.offset = playlists.offset + data.playlists.limit
          data.playlists.total = playlists.total
          data.playlists.items.push(...playlists.items)
          data.isMore = false
        }
      }
      catch (e) {
        store.dispatch(`AppModule/${AppActionTypes.SET_NOT_FOUND}`)
      }
    }

    const loadMore = () => {
      if (data.isMore) return false
      data.isMore = true
      getCategoryPlaylists(data.categoryID)
    }

    onMounted(() => {
      const { id } = route.params
      data.categoryID = id
    })

    return {
      data,
      title,
      loadMore,
    }
  },
})
</script>
