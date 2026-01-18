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
    const roomData = toRoomWithTablesDto(room)

    return inertia.render('rooms/show', { room: roomData })
  }

  async lockRoom({ params, request, response, session }: HttpContext) {
    const { id } = params
    const ownerId = request.input('ownerId')

    const result = await this.lockService.acquire('room:' + id, 'owner:' + ownerId, 300)

    if (result) {
      session.flash('success', 'Room locked successfully.')
    } else {
      session.flash('error', 'Failed to lock the room. It may already be locked.')
    }
    // return response.redirect().back()
  }
}
