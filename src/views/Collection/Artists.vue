<template>
  <infinite-loader
    :more="loadMore"
  >
    <div class="artists-view">
      <entity-header title="Artists" />
      <div class="flex flex-wrap py-4">
        <media-object
          v-for="item in data.artists.items"
          :id="item.id"
          :key="item.id"
          :uri="item.uri"
          :name="item.name"
          :type="item.type"
          :cover-img="item.images"
        />
      </div>
    </div>
  </infinite-loader>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import EntityHeader from '/~/components/EntityHeader.vue'
import MediaObject from '/~/components/MediaObject.vue'
import InfiniteLoader from '/~/components/InfiniteLoader.vue'
import followApi from '/~/api/spotify/follow'
import { getParameterByName } from '/~/utils'

export default defineComponent({
  components: {
    EntityHeader,
    MediaObject,
    InfiniteLoader,
  },
  setup() {
    const data = reactive({
      artists: {
        limit: 50,
        offset: 0,
        total: 1,
        after: '',
        items: [] as Array<any>,
      },
      isMore: false,
    })

    const getArtist = async() => {
      try {
        if (data.artists.total > data.artists.offset) {
          const res = await followApi.getFollowedArtists(
            data.artists.limit,
          )

          data.artists.after = getParameterByName(
            'after',
            res.data.artists.next,
          )

          data.artists.total = res.data.artists.total
          data.artists.items.push(...res.data.artists.items)
          data.artists.offset = data.artists.items.length
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
      getArtist()
    }

    return {
      loadMore,
      data,
    }
  },
})
</script>
