<template>
  <div ref="root" :class="elClass">
    <icon class="btn" icon="fluent-phone-desktop-20-filled" @click="onClick" />
    <div
      v-if="data.isVisible"
      class="container"
    >
      <h3 class="title">
        Connect to a device
      </h3>
      <div class="content">
        <!-- <img class="header" :src="require('/~/assets/img/connect-header.png')" alt="connect-header"> -->
        <ul class="list">
          <li
            v-for="(device, index) in data.devices"
            :key="index"
            class="list-item"
            :class="{ '--active': device.is_active }"
          >
            <button
              @click="onDeviceConnect(device.id)"
            >
              <icon
                v-if="device.type === 'Smartphone'"
                class="device-icon"
                icon="ic-baseline-smartphone"
              />
              <icon
                v-if="device.type === 'Computer'"
                class="device-icon"
                icon="gridicons-computer"
              />

              <div class="info">
                <span class="device-title">
                  <template v-if="!device.is_active">
                    {{ device.name }}
                  </template>
                  <template v-if="device.is_active">Listening On</template>
                </span>
                <span class="device-subtitle">
                  <template v-if="device.is_active">
                    {{ device.name }}
                  </template>
                  <template v-else>
                    Spotify Connect
                  </template>
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from 'vue'
import Icon from '/~/components/Icon.vue'
import playerApi from '/~/api/spotify/player'

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const root = ref(null)
    const data = reactive({
      devices: {},
      isVisible: false,
    })

    const elClass = computed(() => ['device-picker', { '--opened': data.isVisible }])

    const getUserDevices = async() => {
      try {
        const res = await playerApi.getUserDevices()
        data.devices = res.data.devices
      }
      catch (e) {
        console.log(e)
      }
    }

    const close = () => {
      data.isVisible = false
      document.removeEventListener('click', clickOutEvent)
    }

    const onClick = () => {
      data.isVisible = !data.isVisible

      if (data.isVisible)
        setTimeout(() => document.addEventListener('click', clickOutEvent), 100)
    }

    function clickOutEvent(e: {target: any }) {
      const el = root.value
      if (el) {
        const dropdown = el.children[0]
        if (e.target !== dropdown && dropdown.contains(e.target)) close()
      }
    }

    const onDeviceConnect = async(id: string) => {
      try {
        await playerApi.transferUsersPlayback([id], true)
        close()
        setTimeout(() => {
          getUserDevices()
        }, 500)
      }
      catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getUserDevices()
    })

    return {
      elClass,
      onClick,
      data,
      onDeviceConnect,
    }
  },
})
</script>

<style lang="postcss" scoped>
.device-picker {
  @apply relative text-left;

  .btn {
    @apply text-white text-2xl;
    &:hover {
      @apply text-gray-300;
    }
  }

  &.--opened {
    color: #1db954;
  }

  .container {
    @apply absolute bottom-24 -right-24 z-10 pt-2 w-60 bg-black;
  }

  .content {
    @apply h-6;
  }

  .title {
    @apply mt-1 mb-3 text-lg font-bold text-center;
  }

  .header {
    @apply w-full py-1 px-10;
  }

  .list-item {
    @apply flex items-center w-full py-2 px-1 text-left text-sm outline-none;

    &.--active {
      @apply text-gray-300;

      .subtitle {
        @apply text-gray-300;
      }
    }
  }

  .info {
    @apply flex flex-col;
  }

  .subtitle {
    @apply flex my-1 mx-0 text-xs text-gray-300;
  }

  .device-icon {
    @apply w-8 h-8 mt-1 mr-4 mb-1 ml-1
  }
}
</style>
