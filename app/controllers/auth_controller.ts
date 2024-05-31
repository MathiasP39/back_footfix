import { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/register_user'
import User from '#models/user'
import { LoginUserValidator } from '#validators/login_user'
import Article from '#models/article'
import Composition from '#models/composition'
import Role from '#models/role'

export default class AuthController {
  async register({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(RegisterUserValidator)
      const user = await User.create(payload)
      await auth.use('web').login(user)
      return response.status(201).json({ message: 'User created' })
    } catch (error) {
      return response.status(400).json({ message: 'Register failed failed' })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(LoginUserValidator)
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.status(200).json({ message: 'Login success' })
    } catch (error) {
      return response.status(401).json({ message: 'Login failed' })
    }
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.status(200).json({ message: 'Logout succeed' })
  }

  async suppress({ response, auth }: HttpContext) {
    const UserLogin = auth.getUserOrFail()
    if (UserLogin) {
      await Article.query().where('author_id', '=', UserLogin.id).delete()
      const userGene = await User.query()
        .where('full_name', '=', 'Utilisateur Supprimé')
        .select('id')
        .firstOrFail()
      await Composition.query()
        .where('author_id', '=', UserLogin.id)
        .update({ author_id: userGene.id })
      auth.use('web').logout()
      await UserLogin.delete()
      return response.status(200).json({ message: 'User deleted' })
    } else {
      return response.status(400).json({ message: 'No users found' })
    }
  }

  async suppressById({ params, response }: HttpContext) {
    try {
      const user = await User.query().where('id', '=', params.id).firstOrFail()
      await Article.query().where('author_id', '=', user.id).delete()
      const userGene = await User.query()
        .where('full_name', '=', 'Utilisateur Supprimé')
        .select('id')
        .firstOrFail()
      await Composition.query().where('author_id', '=', user.id).update({ author_id: userGene.id })
      await user.delete()
      return response.status(200).json({ message: 'User deleted' })
    } catch (e) {
      return response.status(400).json({ message: "Can't perform the action" })
    }
  }

  async getInfo({ auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const roleName = await Role.query()
        .where('id', '=', user.roleId)
        .select('title')
        .firstOrFail()
      return { fullname: user.fullName, email: user.email, role: roleName.title }
    } catch (e) {
      console.log(e)
    }
  }

  async isLogin({ response, auth }: HttpContext) {
    try {
      await auth.authenticate()
      return response.status(200).json({ messages: 'Check login success' })
    } catch {
      return response.status(401).json({ message: "User isn't loginned" })
    }
  }

  async isAdmin() {
    return true
  }

  async getAllUser({ response }: HttpContext) {
    const users = await User.query()
      .preload('role')
      .where('full_name', '!=', 'Utilisateur Supprimé')
      .select('*')
    const res = users.map((u) => {
      return { id: u.id, name: u.fullName, role: u.role.title }
    })
    return response.status(200).json(res)
  }
}
