<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3'
import type { InferPageProps, SharedProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'
import { onMounted, onUnmounted, ref } from 'vue'
import TableEntity from '~/components/TableEntity.vue'
import { transmit } from '~/libs/transmit'
import { Subscription } from '@adonisjs/transmit-client'

defineProps<{
  room: InferPageProps<RoomsController, 'show'>['room']
}>()

const guestId = ref<string | null>(null)
let subscription: Subscription

onMounted(async () => {
  let storedGuestId = localStorage.getItem('guest_id')

  if (!storedGuestId) {
    storedGuestId = crypto.randomUUID()
    localStorage.setItem('guest_id', storedGuestId)
  }

  guestId.value = storedGuestId

  subscription = transmit.subscription('room-table-lock-changed')
  await subscription.create()

  subscription.onMessage((data) => {
    console.log(data)
  })
})

onUnmounted(() => {
  if (subscription) {
    subscription.delete()
  }
})

const selectedTableId = ref<number | null>(null)

function handleTableSelect(id: number) {
  if (selectedTableId.value === id) {
    selectedTableId.value = null
  } else {
    selectedTableId.value = id
  }
}

const ownerId = localStorage.getItem('guest_id') || ''

const form = useForm({
  ownerId: ownerId,
})

const page = usePage<SharedProps>()
</script>

<template>
  <Head title="Room" />
  <h1>Room {{ room.name }}</h1>

  <div class="grid grid-cols-4 gap-10">
    <div
      v-for="table in room.tables"
      :key="table.id"
      class="p-4 flex items-center justify-center cursor-pointer"
      :class="{ 'col-span-2': table.seats > 4 }"
    >
      <TableEntity
        :is-selected="selectedTableId === table.id"
        :table="table"
        @select="handleTableSelect"
      />
    </div>
    <form @submit.prevent="form.post(`/rooms/${room.id}/lock-table/${selectedTableId}`)">
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        :disabled="selectedTableId === null"
      >
        Reserve Table
      </button>
    </form>
  </div>
  <div
    v-if="page.props.messages?.success"
    class="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded"
  >
    ✅ {{ page.props.messages.success }}
  </div>

  <div
    v-if="page.props.messages?.error"
    class="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded"
  >
    ❌ {{ page.props.messages.error }}
  </div>
</template>
