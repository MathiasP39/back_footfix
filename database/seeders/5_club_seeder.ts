import Club from '#models/club'
import Ligue from '#models/ligue'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const ligue1Id = await Ligue.query().where('nom', '=', 'Ligue 1').select('id').first()
    const LigaId = await Ligue.query().where('nom', '=', 'LaLiga').select('id').first()
    // Write your database queries inside the run method
    Club.createMany([
      { nom: 'Olympique lyonnais', ligue_id: ligue1Id?.id },
      { nom: 'Real Madrid', ligue_id: LigaId?.id },
    ])
  }
}
