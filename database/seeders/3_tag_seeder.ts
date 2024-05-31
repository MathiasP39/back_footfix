import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Tag.createMany([
      { name: 'Analyse Post match' },
      { name: 'Tactique' },
      { name: 'CPA' },
      { name: 'Mental' },
      { name: 'Tactique Offensive' },
      { name: 'Tactique Defensive' },
    ])
  }
}
