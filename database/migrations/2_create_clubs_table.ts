import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clubs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom')
      table.integer('ligue_id').references('ligues.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
