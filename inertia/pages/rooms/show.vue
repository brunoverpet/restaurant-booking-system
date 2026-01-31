<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3'
import type { InferPageProps, SharedProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'
import TableEntity from '~/components/TableEntity.vue'
import { useGuest } from '~/composables/use_guest'
import { useRoomTables } from '~/composables/use_room_tables'
import { Button } from '~/components/ui/button'

const props = defineProps<{
  room: InferPageProps<RoomsController, 'show'>['room']
}>()

const page = usePage<SharedProps>()
const guestId = useGuest()

const {
  tables,
  selectedTableId,
  handleTableSelect,
  isSelectedTableLockedByMe,
  isSelectedTableLocked,
} = useRoomTables(props.room.tables, guestId.value)

const form = useForm({
  ownerId: guestId.value,
})
</script>

<template>
  <Head title="Room" />
  <h1>Room {{ room.name }}</h1>

  <div class="grid grid-cols-2 gap-32 mt-20" :class="{ 'grid-cols-4': tables.length > 4 }">
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
  </div>
  <div class="flex space-x-4 mt-10">
    <form @submit.prevent="form.post(`/rooms/${room.id}/lock-table/${selectedTableId}`)">
      <Button
        type="submit"
        variant="default"
        class="cursor-pointer"
        :disabled="selectedTableId === null || isSelectedTableLocked"
      >
        Reserve Table
      </Button>
    </form>

    <form
      @submit.prevent="form.post(`/rooms/${room.id}/unlock-table/${selectedTableId}`)"
      v-if="isSelectedTableLocked && isSelectedTableLockedByMe"
    >
      <Button
        type="submit"
        variant="destructive"
        class="cursor-pointer"
        :disabled="!isSelectedTableLockedByMe"
      >
        Cancel reservation
      </Button>
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
