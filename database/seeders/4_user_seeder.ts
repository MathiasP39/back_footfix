import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    const adminid = await Role.query().where('title', '=', 'admin').select('id').first()
    await User.createMany([
      {
        fullName: 'Mathias Puyfages',
        roleId: adminid?.id,
        email: 'mathias@gmail.com',
        password: 'jura',
        id: 'cle',
      },
      {
        fullName: 'Exemple Test',
        roleId: 2,
        email: 'exemple@test.fr',
        password: 'exemple',
        id: 'cle1',
      },
      {
        fullName: 'Erwan chatelet',
        roleId: 2,
        email: 'erwan@alpine.fr',
        password: 'egirl',
        id: 'cle3',
      },
      {
        id: '1',
        fullName: 'Dupont Antoine',
        roleId: 2,
        email: 'antoine@dupont.fr',
        password: 'toulouse',
      },
      {
        id: '2',
        fullName: 'Roussel alexandre',
        roleId: 2,
        email: 'alexandre@flipper.fr',
        password: 'chat',
      },
    ])
  }
}
