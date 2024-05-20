import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Composition from './composition.js'
import { TypeJoueur } from '#enums/type_joueur'
import JoueursReel from './joueurs_reel.js'

export default class Joueur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare type: TypeJoueur

  @manyToMany(() => Composition, {
    pivotTable: 'joueurs_compositions',
    pivotColumns: ['position_x', 'position_y', 'numero'],
  })
  declare compositions: ManyToMany<typeof Composition>

  @hasOne(() => JoueursReel)
  declare joueur_reel: HasOne<typeof JoueursReel>
}
