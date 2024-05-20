import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/type_roles'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      { id: Roles.ADMIN, title: 'admin' },
      { id: Roles.USER, title: 'user' },
    ])
  }
}
