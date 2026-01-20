<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3'
import type { InferPageProps, SharedProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'
import { ref } from 'vue'
import TableEntity from '~/components/TableEntity.vue'
import { useGuest } from '~/composables/use_guest'
import { useRoomChannel } from '~/composables/use_room_channel'

const props = defineProps<{
  room: InferPageProps<RoomsController, 'show'>['room']
}>()

type RoomType = InferPageProps<RoomsController, 'show'>['room']
type BaseTable = RoomType['tables'][number]
type UiTable = BaseTable & {
  lockedBy?: string | null
}

const page = usePage<SharedProps>()
const selectedTableId = ref<number | null>(null)
const tables = ref<UiTable[]>(props.room.tables)
const guestId = useGuest()
let ownerId = guestId.value

useRoomChannel('room-table-lock-changed', (data) => {
  const table = tables.value.find((table) => table.id.toString() === data.tableId)
  if (table) {
    table.lockedBy = data.ownerId
  }
})

const form = useForm({
  ownerId,
})

function handleTableSelect(id: number) {
  if (selectedTableId.value === id) {
    selectedTableId.value = null
  } else {
    selectedTableId.value = id
  }
}

console.log(tables.value)
</script>

<template>
  <Head title="Room" />
  <h1>Room {{ room.name }}</h1>

  <div class="grid grid-cols-4 gap-10">
    <div
      v-for="table in tables"
      :key="table.id"
      class="p-4 flex items-center justify-center cursor-pointer"
      :class="{ 'col-span-2': table.seats > 4 }"
    >
      <TableEntity
        :is-locked="!!table.lockedBy"
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
