<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'

defineProps<{
  rooms: InferPageProps<RoomsController, 'index'>['rooms']
}>()
</script>

<template>
  <Head title="Rooms" />

  <div>
    <h1>Rooms page</h1>
    <div v-for="room in rooms" :key="room.id">
      <Link :href="`/rooms/${room.id}`">
        {{ room.name }}
      </Link>
    </div>
  </div>
</template>
