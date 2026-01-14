import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('table_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tables')
        .onDelete('CASCADE')
      table.string('customer_name', 100).notNullable()
      table.string('customer_email', 255).notNullable()
      table.string('customer_phone', 100).notNullable()
      table.date('date').notNullable()
      table.string('time_slot', 5).notNullable()
      table.enum('status', ['pending', 'confirmed', 'cancelled']).defaultTo('pending')

      table.index(['table_id', 'date', 'time_slot'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
