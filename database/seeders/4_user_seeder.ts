import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    const adminid = await Role.query().where('title', '=', 'admin').select('id').first()
    await User.createMany([
      {
        fullName: 'Utilisateur Supprimé',
        roleId: 1,
        email: 'utilisateur@supprimé.nologin',
        password: 'motdepassetrescompliqué123456789',
      },
      {
        fullName: 'Mathias Puyfages',
        roleId: adminid?.id,
        email: 'mathias@gmail.com',
        password: 'jura',
      },
      {
        fullName: 'Exemple Test',
        roleId: 2,
        email: 'exemple@test.fr',
        password: 'exemple',
      },
      {
        fullName: 'Erwan chatelet',
        roleId: 2,
        email: 'erwan@alpine.fr',
        password: 'egirl',
      },
      {
        fullName: 'Dupont Antoine',
        roleId: 2,
        email: 'antoine@dupont.fr',
        password: 'toulouse',
      },
      {
        fullName: 'Roussel alexandre',
        roleId: 2,
        email: 'alexandre@flipper.fr',
        password: 'chat',
      },
    ])
  }
}
