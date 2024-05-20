import Ligue from '#models/ligue'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Ligue.createMany([
      { pays: 'France', nom: 'Ligue 1' },
      { pays: 'Angleterre', nom: 'Premier League' },
      { pays: 'Espagne', nom: 'LaLiga' },
      { pays: 'Italie', nom: 'Serie A' },
      { pays: 'Allemagne', nom: 'Bundesliga' },
    ])
  }
}
