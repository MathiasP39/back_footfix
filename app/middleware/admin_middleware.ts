import Roles from '#enums/type_roles'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)

    try {
      const user = ctx.auth.getUserOrFail()
      if (user.roleId === Roles.ADMIN) {
        const output = await next()
        return output
      }
    } catch (e) {
      console.log(e)
    }
  }
}
