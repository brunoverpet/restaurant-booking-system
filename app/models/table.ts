import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Room from '#models/room'
import Reservation from '#models/reservation'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roomId: number

  @column()
  declare number: number

  @column()
  declare seats: number

  @column()
  declare positionX: number

  @column()
  declare positionY: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>
}