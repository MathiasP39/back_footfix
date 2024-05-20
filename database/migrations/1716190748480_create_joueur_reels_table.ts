import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'joueur_reels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('joueur_id').references('joueurs.id')
      table.integer('numero')
      table.string('nationalite_sportive')
      table.integer('club').references('clubs.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
