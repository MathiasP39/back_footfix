import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import Role from './role.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Article from './article.js'

const AuthFinder = withAuthFinder(() => hash.use(), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string

  @column()
  declare roleId: number

  @column({ isPrimary: true })
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  static async createUUID(payload: User) {
    payload.id = randomUUID()
  }

  @hasMany(() => Article, {
    localKey: 'id',
    foreignKey: 'author_id',
  })
  declare articles: HasMany<typeof Article>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
