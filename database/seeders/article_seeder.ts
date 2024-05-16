import Article from '#models/article'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Article.createMany([
      {
        title: 'Les penaltys, une loterie ?',
        description: 'Vous découvirez dans cet article les loi qui régisse cet exercice souvent critiqué a tort',
        content: 'Non',
        author_id: 'cc0545a1-e09a-40ff-8bca-39b11ecc0eab',
      },
    ])
  }
}
