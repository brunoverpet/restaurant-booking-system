import { onUnmounted } from 'vue'
import { ChannelType } from '#shared/types/channels'
import { transmit } from '~/libs/transmit'

export async function useRoomChannel(channelName: string, callback: (data: ChannelType) => void) {
  let subscription: any = null

  onUnmounted(() => {
    if (subscription) {
      subscription.delete()
    }
  })

  subscription = transmit.subscription(channelName)
  await subscription.create()

  subscription.onMessage((data: ChannelType) => {
    callback(data)
  })
}
