import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Composition from './composition.js'

export default class Joueur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @manyToMany(() => Composition, {
    pivotTable: 'joueurs_compositions',
    pivotColumns: ['position_x', 'position_y', 'numero'],
  })
  declare compositions: ManyToMany<typeof Composition>
}
