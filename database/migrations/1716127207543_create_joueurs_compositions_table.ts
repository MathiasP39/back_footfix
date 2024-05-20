import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'joueurs_compositions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('composition_id').unsigned().references('compositions.id')
      table.integer('joueur_id').unsigned().references('joueurs.id')
      table.integer('numero')
      table.integer('position_x')
      table.integer('position_y')
      table.unique(['composition_id', 'joueur_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
