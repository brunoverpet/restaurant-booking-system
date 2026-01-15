import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'
import { toRoomDto, toRoomWithTablesDto } from '#dtos/room_dto'

export default class RoomsController {
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
}
