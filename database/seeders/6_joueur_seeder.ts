import { TypeJoueur } from '#enums/type_joueur'
import Joueur from '#models/joueur'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    Joueur.createMany([
      { nom: 'Alexandre Lacazette', type: TypeJoueur.REEL },
      { nom: 'Nemanja Matic', type: TypeJoueur.REEL },
      { nom: 'Clinton Mata', type: TypeJoueur.REEL },
      { nom: "Jack O'Brien", type: TypeJoueur.REEL },
      { nom: 'Vinicius Junior', type: TypeJoueur.REEL },
      { nom: 'Aurélien Tchouaméni', type: TypeJoueur.REEL },
    ])
  }
}
