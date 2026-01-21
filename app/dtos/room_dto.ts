import { TableDto, toTableDto } from '#dtos/table_dto'
import type Room from '#models/room'

export interface RoomDto {
  id: number
  name: string
  capacity: number
}

export interface RoomWithTablesDto extends RoomDto {
  tables: TableDto[]
}

export function toRoomDto(room: Room): RoomDto {
  return {
    id: room.id,
    name: room.name,
    capacity: room.capacity,
  }
}

export function toRoomWithTablesDto(
  room: Room,
  lockedTables: Record<number, string> = {}
): RoomWithTablesDto {
  return {
    ...toRoomDto(room),
    tables: room.tables.map((table) => {
      const lockedBy = lockedTables[table.id] || null

      return toTableDto(table, lockedBy)
    }),
  }
}
