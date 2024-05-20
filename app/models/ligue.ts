import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Club from './club.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Ligue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pays: string

  @column()
  declare nom: string

  @hasMany(() => Club, {
    localKey: 'id',
    foreignKey: 'ligueId',
  })
  declare club: HasMany<typeof Club>
}
