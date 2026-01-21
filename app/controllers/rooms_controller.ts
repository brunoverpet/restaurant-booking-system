import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'
import { toRoomDto, toRoomWithTablesDto } from '#dtos/room_dto'
import { inject } from '@adonisjs/core'
import { LockService } from '#services/lock_service'

@inject()
export default class RoomsController {
  constructor(private lockService: LockService) {}

  async index({ inertia }: HttpContext) {
    const rooms = await Room.all()
    const roomsData = rooms.map(toRoomDto)

    return inertia.render('rooms/index', { rooms: roomsData })
  }

  async show({ params, inertia }: HttpContext) {
    const { id } = params

    const room = await Room.query().where('id', id).preload('tables').firstOrFail()
    const lockedTables: Record<number, string> = {}

    await Promise.all(
      room.tables.map(async (table) => {
        const ownerId = await this.lockService.getTableOwner(room.id, table.id)
        if (ownerId) {
          lockedTables[table.id] = ownerId
        }
      })
    )

    const roomData = toRoomWithTablesDto(room, lockedTables)

    return inertia.render('rooms/show', { room: roomData })
  }

  async lockRoom({ params, request, response, session }: HttpContext) {
    // const { "table-id", "room-id" } = params
    const tableId = params['table-id']
    const roomId = params['room-id']
    const ownerId = request.input('ownerId')
    // console.log(`Locking table ${tableId} in room ${roomId} by owner ${ownerId}`)

    const result = await this.lockService.acquire(
      'owner:' + ownerId,
      `roomId:${roomId}:tableId:${tableId}`,
      300
    )

    if (result) {
      session.flash('success', 'Room locked successfully.')
    } else {
      session.flash('error', 'Failed to lock the room. It may already be locked.')
    }
    return response.redirect().back()
  }

  async unlockRoom({ params, request, response, session }: HttpContext) {
    // const { "table-id", "room-id" } = params
    const tableId = params['table-id']
    const roomId = params['room-id']
    const ownerId = request.input('ownerId')
    // console.log(`Locking table ${tableId} in room ${roomId} by owner ${ownerId}`)

    const result = await this.lockService.release(
      'owner:' + ownerId,
      `roomId:${roomId}:tableId:${tableId}`
    )

    if (result) {
      session.flash('success', 'Room unlocked successfully.')
    } else {
      session.flash('error', 'Failed to unlock the room. It may already be unlocked.')
    }
    return response.redirect().back()
  }
}
