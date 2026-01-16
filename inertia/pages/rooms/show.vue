<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
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
  </div>
</template>
