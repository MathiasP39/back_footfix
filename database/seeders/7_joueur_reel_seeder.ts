import Club from '#models/club'
import Joueur from '#models/joueur'
import JoueursReel from '#models/joueurs_reel'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const LacazetteId = await Joueur.query()
      .where('nom', '=', 'Alexandre Lacazette')
      .select('id')
      .first()

    const OLId = await Club.query().where('nom', '=', 'Olympique lyonnais').first()

    JoueursReel.createMany([
      {
        numero: 10,
        nationalite_sportive: 'Francais',
        joueur_id: LacazetteId?.id,
        club_id: OLId?.id,
      },
    ])
  }
}
