import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Table from '#models/table'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tableId: number

  @column()
  declare customerName: string

  @column()
  declare customerEmail: string

  @column()
  declare customerPhone: string

  @column()
  declare date: string

  @column()
  declare timeSlot: string

  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Table)
  declare table: BelongsTo<typeof Table>
}