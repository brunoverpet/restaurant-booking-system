import type Table from '#models/table'

export interface TableDto {
  id: number
  number: number
  roomId: number
  seats: number
  positionX: number
  positionY: number
}

export function toTableDto(table: Table): TableDto {
  return {
    id: table.id,
    roomId: table.roomId,
    number: table.number,
    seats: table.seats,
    positionX: table.positionX,
    positionY: table.positionY,
  }
}
