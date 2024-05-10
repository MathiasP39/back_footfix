/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/auth_controller')
const ArticlesController = () => import('#controllers/articles_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router.post('/auth/register', [UsersController, 'register'])
    router.post('/auth/login', [UsersController, 'login'])
    router.get('/article', [ArticlesController, 'getAllArticle'])
    router.post('/article', [ArticlesController, 'publishArticles'])
    router.get('/me',[])
  })
  .prefix('/api/v1')
router
  .get('/connected', () => {
    return 'protected'
  })
  .use(middleware.auth({ guards: ['web'] }))

router.get('/test', () => {
  return 'fonctionnel'
})
