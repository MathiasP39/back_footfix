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

  async getInfo({ auth }: HttpContext) {
    const user = auth.user
    user?.fullName
    return { fullname: user?.fullName }
  }

  async isLogin({ response, auth }: HttpContext) {
    try {
      await auth.authenticate()
      return response.status(200).json({ messages: 'Check login success' })
    } catch {
      return response.status(401).json({ message: "User isn't loginned" })
    }
  }
}
