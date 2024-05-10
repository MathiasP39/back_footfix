import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Mathias Puyfages',
        roleId: 1,
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
    ])
  }
}
