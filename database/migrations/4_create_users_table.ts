import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#enums/type_roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).notNullable().primary()
      table.integer('role_id').unsigned().references('roles.id').notNullable().defaultTo(Roles.USER)
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}