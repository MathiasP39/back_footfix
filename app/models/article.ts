import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Tag from './tag.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare likeCount: number

  @column()
  declare author_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'article_tags',
  })
  declare tags: ManyToMany<typeof Tag>
}
