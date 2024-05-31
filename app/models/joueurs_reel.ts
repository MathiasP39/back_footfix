import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Joueur from './joueur.js'
import Club from './club.js'

export default class JoueursReel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: number

  @column()
  declare nationalite_sportive: string

  @column()
  declare joueur_id: number

  @column()
  declare club_id: number

  @hasOne(() => Joueur, {
    localKey: 'joueur_id',
    foreignKey: 'id',
  })
  declare joueur: HasOne<typeof Joueur>

  @belongsTo(() => Club, {
    localKey: 'club',
    foreignKey: 'id',
  })
  declare club: BelongsTo<typeof Club>
}
