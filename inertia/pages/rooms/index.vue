<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type RoomsController from '#controllers/rooms_controller'
import { onMounted, ref } from 'vue'

defineProps<{
  rooms: InferPageProps<RoomsController, 'index'>['rooms']
}>()

const guestId = ref<string | null>(null)

onMounted(() => {
  let storedGuestId = localStorage.getItem('guest_id')

  if (!storedGuestId) {
    storedGuestId = crypto.randomUUID()
    localStorage.setItem('guest_id', storedGuestId)
  }

  guestId.value = storedGuestId
})
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
