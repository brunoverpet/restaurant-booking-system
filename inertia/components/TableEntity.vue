<script setup lang="ts">
import type { TableDto } from '#dtos/table_dto'

defineProps<{
  isSelected: boolean
  isLocked: boolean
  table: TableDto
}>()

defineEmits<{
  (e: 'select', id: number): void
}>()
</script>

<template>
  <div
    @click="$emit('select', table.id)"
    class="flex w-20 h-20 relative items-center justify-center rounded-2xl"
    :class="isLocked ? 'bg-red-500' : isSelected ? 'bg-teal-400' : 'bg-gray-200'"
  >
    <div class="absolute -top-13 w-full flex justify-evenly">
      <div
        v-for="n in (table.seats - 2) / 2"
        :key="n"
        class="relative flex justify-center w-9 h-2 bg-gray-100 rounded-full bg-linear-to-b from-white to-gray-400"
      >
        <div class="w-8 h-8 rounded-xs absolute top-1.5 bg-linear-to-b from-gray-100 to-gray-400">
          <div class="w-1 h-0.5 absolute top-8 left-1 bg-gray-400 rounded-xs"></div>
          <div class="w-1 h-0.5 absolute top-8 right-1 bg-gray-400 rounded-xs"></div>
        </div>
      </div>
    </div>

    <div class="absolute -bottom-13 w-full flex justify-evenly">
      <div
        v-for="n in (table.seats - 2) / 2"
        :key="n"
        class="relative flex justify-center w-9 h-2 bg-gray-100 rounded-full bg-linear-to-t from-white to-gray-400"
      >
        <div
          class="w-8 h-8 rounded-xs absolute bottom-1.5 bg-linear-to-t from-gray-100 to-gray-400"
        >
          <div class="w-1 h-0.5 absolute bottom-8 left-1 bg-gray-400 rounded-xs"></div>
          <div class="w-1 h-0.5 absolute bottom-8 right-1 bg-gray-400 rounded-xs"></div>
        </div>
      </div>
    </div>

    <div class="w-2 h-9 absolute -left-13 rounded-full bg-linear-to-r from-white to-gray-400">
      <div
        class="w-8 h-8 rounded-xs absolute left-1.5 top-0.5 bg-linear-to-r from-gray-100 to-gray-400"
      >
        <div class="w-0.5 h-1 absolute left-8 top-1 bg-gray-400 rounded-xs"></div>
        <div class="w-0.5 h-1 absolute left-8 bottom-1 bg-gray-400 rounded-xs"></div>
      </div>
    </div>

    <div class="w-2 h-9 absolute -right-13 rounded-full bg-linear-to-l from-white to-gray-400">
      <div
        class="w-8 h-8 rounded-xs absolute right-1.5 top-0.5 bg-linear-to-l from-gray-100 to-gray-400"
      >
        <div class="w-0.5 h-1 absolute right-8 top-1 bg-gray-400 rounded-xs"></div>
        <div class="w-0.5 h-1 absolute right-8 bottom-1 bg-gray-400 rounded-xs"></div>
      </div>
    </div>

    {{ table.seats }}
  </div>
</template>
