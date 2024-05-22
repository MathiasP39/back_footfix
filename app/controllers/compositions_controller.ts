import { TypeJoueur } from '#enums/type_joueur'
import Composition from '#models/composition'
import Joueur from '#models/joueur'
import { CompositionValidator } from '#validators/composition'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompositionsController {
  async getAllComps({ response }: HttpContext) {
    const Comps = await Composition.query().preload('author').select('*')
    if (Comps) {
      const jsonReturn = Comps.map((info) => {
        console.log(info.author)
        return { id: info.id, name: info.name, auteur: info.author.fullName }
      })
      return response.status(200).json(jsonReturn)
    } else {
      return response.status(200).json({ message: 'No composition refer this user' })
    }
  }

  async getMyComps({ response, auth }: HttpContext) {
    if (await auth.authenticate()) {
      const utilisateur = await auth.user
      if (utilisateur) {
        const Comps = await Composition.query().where('author_id', utilisateur.id)
        if (Comps) {
          const jsonReturn = Comps.map((info) => {
            return { id: info.id, nom: info.name }
          })
          return response.status(200).json(jsonReturn)
        } else {
          return response.status(200).json({ message: 'No composition refer this user' })
        }
      }
    }
  }

  async getCompByID({ params, response }: HttpContext) {
    console.log(params.id)
    const Compo = await Composition.query()
      .preload('author')
      .preload('joueur')
      .where('id', '=', params.id)
      .first()
    const listeJoueur = Compo?.joueur
    const responseData = {
      author_name: Compo?.author.fullName,
      compo_name: Compo?.name,
      joueurs: listeJoueur?.map((joueur) => joueur.toJSON()),
    }
    return response.status(200).json(responseData)
  }

  async createComp({ request, response, auth }: HttpContext) {
    try {
      const payload = request.validateUsing(CompositionValidator)
      const User = auth.user
      if (User) {
        payload.then((values) => {
          const compo = Composition.create({ name: values.name, author_id: User.id })
          values.joueurs.map(async (joueur) => {
            const player = await Joueur.findBy({ nom: joueur.name })
            if (!player) {
              const addjoueur = Joueur.create({ nom: joueur.name, type: TypeJoueur.FICTIF })
              addjoueur.then((newJoueur) => {
                return compo.then((table) => {
                  return table.related('joueur').attach({
                    [newJoueur.id]: {
                      position_x: joueur.positionx,
                      position_y: joueur.positiony,
                      numero: joueur.numero,
                    },
                  })
                })
              })
            } else {
              compo.then((table) => {
                return table.related('joueur').attach({
                  [player.id]: {
                    position_x: joueur.positionx,
                    position_y: joueur.positiony,
                    numero: joueur.numero,
                  },
                })
              })
            }
          })
        })
      } else {
        throw new Error("Can't find the authentificated user")
      }
      return response.status(201)
    } catch (error) {
      console.log(error)
      return response.status(400)
    }
  }
}
