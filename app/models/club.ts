import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Ligue from './ligue.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Club extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare ligue_id: number

  @belongsTo(() => Ligue)
  declare ligue: BelongsTo<typeof Ligue>
}
