<template>
  <infinite-loader
    :more="loadMore"
  >
    <div class="albums-view">
      <entity-header title="Albums" />
      <div class="flex flex-wrap py-4">
        <media-object
          v-for="(item, index) in data.albums.items"
          :id="item.album.id"
          :key="index"
          :uri="item.album.uri"
          :cover-img="item.album.images"
          :name="item.album.name"
          :artists="item.album.artists"
          :type="item.album.type"
        />
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import MediaObject from '/~/components/MediaObject.vue'
import libraryApi from '/~/api/spotify/library'

interface AlbumItem {
  uri: string
  name: string
  type: string
  album_group: string
  artists: Array<object>
  href: string
  id: string
  images: Array<object>
}

export default defineComponent({
  components: {
    InfiniteLoader,
    EntityHeader,
    MediaObject,
  },
  setup() {
    const data = reactive({
      albums: {
        limit: 25,
        offset: 0,
        total: 1,
        items: [] as Array<AlbumItem>,
      },
      isMore: false,
    })

    const getAlbums = async() => {
      try {
        if (data.albums.total > data.albums.offset) {
          const res = await libraryApi.getAlbums(
            data.albums.offset,
            data.albums.limit,
          )

          data.albums.offset = res.data.offset + data.albums.limit
          data.albums.total = res.data.total
          data.albums.items.push(...res.data.items)
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
      getAlbums()
    }

    return {
      data,
      loadMore,
    }
  },
})
</script>
