import { ref } from 'vue'

const guestId = ref<string>('')

// Fonction utilitaire pour générer un UUID sans l'API Crypto
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function useGuest() {
  let storedGuestId = localStorage.getItem('guest_id')

  if (!storedGuestId) {
    // On utilise la fonction compatible HTTP
    storedGuestId = generateUUID()
    localStorage.setItem('guest_id', storedGuestId)
  }

  guestId.value = storedGuestId
  return guestId
}
