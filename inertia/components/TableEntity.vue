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
    class="flex w-full h-16 relative items-center justify-center rounded-2xl"
    :class="isLocked ? 'bg-red-500' : isSelected ? 'bg-teal-400' : 'bg-gray-200'"
  >
    <div class="absolute -top-3 w-full flex justify-evenly">
      <div
        v-for="n in (table.seats - 2) / 2"
        :key="n"
        class="w-8 h-2 bg-gray-300 rounded-full"
      ></div>
    </div>
    <div class="absolute -bottom-3 w-full flex justify-evenly">
      <div
        v-for="n in (table.seats - 2) / 2"
        :key="n"
        class="w-8 h-2 bg-gray-300 rounded-full"
      ></div>
    </div>
    <div class="absolute -left-3 w-2 h-8 bg-gray-300 rounded-full"></div>
    <div class="absolute -right-3 w-2 h-8 bg-gray-300 rounded-full"></div>
    {{ table.number }}
  </div>
</template>
