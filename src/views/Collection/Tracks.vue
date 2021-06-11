<template>
  <infinite-loader
    :more="loadMore"
  >
    <div class="tracks-view">
      <div class="content">
        <entity-header title="Songs" />
        <tracks-table :tracks="data.tracks.items" type="library" />
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import TracksTable from '/~/components/TracksTable.vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import libraryApi from '/~/api/spotify/library'

export default defineComponent({
  components: {
    EntityHeader,
    TracksTable,
    InfiniteLoader,
  },
  setup() {
    const data = reactive({
      tracks: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [],
      },
      isMore: false,
    })

    const getTracks = async() => {
      try {
        if (data.tracks.total > data.tracks.offset) {
          const res = await libraryApi.getTracks(
            data.tracks.offset,
            data.tracks.limit,
          )
          data.tracks.offset = res.data.offset + data.tracks.limit
          data.tracks.total = res.data.total
          data.tracks.items.push(...res.data.items)
          data.isMore = false
        }
      }
      catch (e) {
        console.log(e)
      }
    }

    const loadMore = () => {
      if (data.isMore) return false
      data.isMore = true
      getTracks()
    }

    return {
      data,
      loadMore,
    }
  },
})
</script>
