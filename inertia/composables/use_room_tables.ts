import { computed, ref } from 'vue'
import { useRoomChannel } from './use_room_channel'

export function useRoomTables(initialTables: any[], guestId: string) {
  const tables = ref(initialTables)
  const selectedTableId = ref<number | null>(null)

  void useRoomChannel('room-table-lock-changed', (data) => {
    const table = tables.value.find((t) => t.id.toString() === data.tableId)
    if (table) {
      table.lockedBy = data.ownerId
    }
  })

  function handleTableSelect(id: number) {
    selectedTableId.value = selectedTableId.value === id ? null : id
  }

  const isSelectedTableLockedByMe = computed(() => {
    if (!selectedTableId.value) return false
    const table = tables.value.find((t) => t.id === selectedTableId.value)

    if (!table || !table.lockedBy) return false

    const lockedById = table.lockedBy.split(':')[1] || table.lockedBy
    return lockedById === guestId
  })

  const isSelectedTableLocked = computed(() => {
    if (!selectedTableId.value) return false
    const table = tables.value.find((t) => t.id === selectedTableId.value)
    return !!table?.lockedBy
  })

  return {
    tables,
    selectedTableId,
    handleTableSelect,
    isSelectedTableLockedByMe,
    isSelectedTableLocked,
  }
}
