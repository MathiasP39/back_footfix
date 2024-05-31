import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Joueur from './joueur.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Composition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare author_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @manyToMany(() => Joueur, {
    pivotTable: 'joueurs_compositions',
    pivotColumns: ['position_x', 'position_y', 'numero'],
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'composition_id',
    pivotRelatedForeignKey: 'joueur_id',
  })
  declare joueur: ManyToMany<typeof Joueur>

  @belongsTo(() => User, { foreignKey: 'author_id', localKey: 'id' })
  declare author: BelongsTo<typeof User>
}
