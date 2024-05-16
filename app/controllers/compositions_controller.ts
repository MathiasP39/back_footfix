import type { HttpContext } from '@adonisjs/core/http'

export default class CompositionsController {
  async createComp({ request, response }: HttpContext) {
    try {
      console.log(request)
      return response.status(201)
    } catch (error) {
      console.log(error)
      return response.status(400)
    }
  }
}
