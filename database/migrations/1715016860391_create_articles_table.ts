import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('content').notNullable()
      table.integer('countLike').defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.string('author_id').references('users.id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
