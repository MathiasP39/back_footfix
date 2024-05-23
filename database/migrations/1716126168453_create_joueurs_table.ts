import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'joueurs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom')
      table.enu('type', ['reel', 'fictif'], {
        useNative: true,
        enumName: 'joueur_type',
        existingType: false,
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw(`
    DROP TYPE joueur_type;
  `)
  }
}
