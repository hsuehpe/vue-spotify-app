<template>
  <infinite-loader
    :more="loadMore"
  >
    <div class="new-releases-view">
      <entity-header title="New albums & singles" small="true" />
      <div class="inner">
        <div v-if="data.albums.items.length > 0" class="flex flex-wrap py-4">
          <media-object
            v-for="(item, index) in data.albums.items"
            :id="item.id"
            :key="index"
            :uri="item.uri"
            :cover-img="item.images"
            :name="item.name"
            :artists="item.artists"
            :type="item.type"
          />
        </div>
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import browseApi from '/~/api/spotify/browse'
import MediaObject from '/~/components/MediaObject.vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'

export default defineComponent({
  components: {
    MediaObject,
    InfiniteLoader,
  },
  setup() {
    const data = reactive({
      albums: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [],
      },
      more: false,
    })

    const getNewReleases = async() => {
      try {
        if (data.albums.total > data.albums.offset) {
          const res = await browseApi.getNewReleases(
            data.albums.offset,
            data.albums.limit,
          )

          data.albums.offset = res.data.albums.offset + data.albums.limit
          data.albums.total = res.data.albums.total
          data.albums.items.push(...res.data.albums.items)
          data.more = false
        }
      }
      catch (e) {
        console.log(e)
      }
    }

    const loadMore = (ev: { detail: { scrollbarV: { percent: number } } }) => {
      if (data.more) return false
      data.more = true
      getNewReleases()
    }

    return {
      data,
      loadMore,
    }
  },
})
</script>

<style lang="postcss" scoped>
.new-releases-view {
  height: calc(100vh - 14rem);
}
</style>
