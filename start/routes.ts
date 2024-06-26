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
const CompositionsController = () => import('#controllers/compositions_controller')
const UsersController = () => import('#controllers/auth_controller')
const ArticlesController = () => import('#controllers/articles_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [UsersController, 'register'])
        router.post('/login', [UsersController, 'login'])
        router
          .post('/logout', [UsersController, 'logout'])
          .use(middleware.auth({ guards: ['web'] }))
        router.get('/check', [UsersController, 'isLogin'])
        router
          .delete('/suppress', [UsersController, 'suppress'])
          .use(middleware.auth({ guards: ['web'] }))
        router
          .get('/isAdmin', [UsersController, 'isAdmin'])
          .use(middleware.auth({ guards: ['web'] }))
          .use(middleware.admin())
        router
          .get('/AllUsers', [UsersController, 'getAllUser'])
          .use(middleware.auth({ guards: ['web'] }))
          .use(middleware.admin())
        router.delete('/suppressUser/:id', [UsersController, 'suppressById'])
      })
      .prefix('/auth')

    router
      .group(() => {
        router
          .put('/save', [CompositionsController, 'SaveComp'])
          .use(middleware.auth({ guards: ['web'] }))
        router.get('/', [CompositionsController, 'getAllComps'])
        router
          .get('/myComps', [CompositionsController, 'getMyComps'])
          .use(middleware.auth({ guards: ['web'] }))
        router
          .delete('/delete', [CompositionsController, 'deleteComposition'])
          .use(middleware.auth({ guards: ['web'] }))
        router.get('/:id', [CompositionsController, 'getCompByID'])
      })
      .prefix('composition')

    router
      .group(() => {
        router.get('/', [ArticlesController, 'getAllArticle'])
        router
          .post('/publish', [ArticlesController, 'publishArticles'])
          .use(middleware.auth({ guards: ['web'] }))
        router
          .get('/getMyArticles', [ArticlesController, 'getMyArticle'])
          .use(middleware.auth({ guards: ['web'] }))
        router
          .delete('/suppress', [ArticlesController, 'deleteArticle'])
          .use(middleware.auth({ guards: ['web'] }))
        router.get('/:id', [ArticlesController, 'getArticleById'])
      })
      .prefix('/article')

    router.get('/me', [UsersController, 'getInfo']).use(middleware.auth({ guards: ['web'] }))
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
