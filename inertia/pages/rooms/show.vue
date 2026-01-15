<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'

defineProps<{
  room: InferPageProps<RoomsController, 'show'>['room']
}>()
</script>

<template>
  <Head title="Room" />
  <h1>Room page</h1>
  <div v-for="table in room" :key="table.id">
    {{ table }}
  </div>
</template>
