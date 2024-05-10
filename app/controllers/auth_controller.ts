import { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/register_user'
import User from '#models/user'
import { LoginUserValidator } from '#validators/login_user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(RegisterUserValidator)
      User.create(payload)
      return response.status(201).json({ message: 'User created' })
    } catch (error) {
      return response.status(400).json({ message: 'Register failed failed' })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(LoginUserValidator)
      const user = await User.verifyCredentials(email, password)
      auth.use('web').login(user)
      return response.status(200).json({ message: 'Loggin success' })
    } catch (error) {
      return response.status(401).json({ message: 'Login failed' })
    }
  }
}
