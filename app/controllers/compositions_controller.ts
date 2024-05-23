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
      const utilisateur = auth.user
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

  async SaveComp({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(CompositionValidator)
      const User = auth.user
      if (User) {
        const compo = payload.id
          ? await Composition.query().preload('joueur').where('id', '=', payload.id).firstOrFail()
          : await Composition.create({ name: payload.name, author_id: User.id })
        payload.joueurs.map(async (joueur) => {
          let player = await Joueur.findBy({ nom: joueur.name })
          console.log(player)
          if (!player) {
            player = await Joueur.create({ nom: joueur.name, type: TypeJoueur.FICTIF })
          }
          const exist = await compo
            .related('joueur')
            .query()
            .where('joueur_id', '=', player.id)
            .first()
          if (exist) {
            compo.related('joueur').sync(
              {
                [player.id]: {
                  position_x: joueur.positionx,
                  position_y: joueur.positiony,
                  numero: joueur.numero,
                },
              },
              false
            )
          } else {
            console.log("le joueur n'existe pas")
            compo.related('joueur').attach({
              [player.id]: {
                position_x: joueur.positionx,
                position_y: joueur.positiony,
                numero: joueur.numero,
              },
            })
          }
        })
        return response.status(201).json({ id: compo.id })
      }
    } catch (e) {
      console.log(e)
      return response.status(400)
    }
  }
}
