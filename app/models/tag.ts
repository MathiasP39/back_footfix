import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Article from './article.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Article, {
    pivotTable: 'article_tags',
  })
  declare skills: ManyToMany<typeof Article>
}
