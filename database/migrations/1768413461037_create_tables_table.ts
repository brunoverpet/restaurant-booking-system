import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('room_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE')
      table.integer('number').unsigned().notNullable()
      table.integer('seats').unsigned().notNullable()
      table.integer('position_x').unsigned().notNullable()
      table.integer('position_y').unsigned().notNullable()

      table.unique(['room_id', 'number'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
