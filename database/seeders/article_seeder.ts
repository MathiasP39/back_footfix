import Article from '#models/article'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Article.createMany([
      {
        title: 'Les penaltys, une loterie ?',
        content: 'Non',
        author_id: 'cc0545a1-e09a-40ff-8bca-39b11ecc0eab',
      },
    ])
  }
}
