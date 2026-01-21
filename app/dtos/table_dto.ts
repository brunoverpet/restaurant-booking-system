import type Table from '#models/table'

export interface TableDto {
  id: number
  number: number
  roomId: number
  seats: number
  positionX: number
  positionY: number
  lockedBy: string | null
}

export function toTableDto(table: Table, lockedBy: string | null = null): TableDto {
  return {
    id: table.id,
    roomId: table.roomId,
    number: table.number,
    seats: table.seats,
    positionX: table.positionX,
    positionY: table.positionY,
    lockedBy: lockedBy,
  }
}
