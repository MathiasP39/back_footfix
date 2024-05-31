import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ligues'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom')
      table.string('pays')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
