import { ref } from 'vue'

const guestId = ref<string>('')

export function useGuest() {
  let storedGuestId = localStorage.getItem('guest_id')

  if (!storedGuestId) {
    storedGuestId = crypto.randomUUID()
    localStorage.setItem('guest_id', storedGuestId)
  }

  guestId.value = storedGuestId
  return guestId
}
