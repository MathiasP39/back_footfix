import Article from '#models/article'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const erwan = await User.query().where('full_name', '=', 'Erwan chatelet').firstOrFail()
    // Write your database queries inside the run method
    await Article.createMany([
      {
        title: 'Les penalties, une lotterie ?',
        description: 'Les penalties sont un arts très décriés en France',
        content: 'Les penalties blababla',
        author_id: erwan.id,
      },
    ])
  }
}
