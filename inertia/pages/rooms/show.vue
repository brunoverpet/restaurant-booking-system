<script setup lang="ts">
import { Form, Head, useForm } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'
import { ref } from 'vue'
import TableEntity from '~/components/TableEntity.vue'

defineProps<{
  room: InferPageProps<RoomsController, 'show'>['room']
}>()

const selectedTableId = ref<number | null>(null)

function handleTableSelect(id: number) {
  if (selectedTableId.value === id) {
    selectedTableId.value = null
  } else {
    selectedTableId.value = id
  }
}

const ownerId = localStorage.getItem('guest_id') || ''
console.log(ownerId)

const form = useForm({
  ownerId: ownerId,
})
</script>

<template>
  <Head title="Room" />
  <h1>Room page</h1>

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
    <form @submit.prevent="form.post(`/rooms/${selectedTableId}/lock`)">
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        :disabled="selectedTableId === null"
      >
        Reserve Table
      </button>
    </form>
  </div>
</template>
