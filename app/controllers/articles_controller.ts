// import type { HttpContext } from '@adonisjs/core/http'

import Roles from '#enums/type_roles'
import Article from '#models/article'
import ws from '#services/ws'
import { ArticleValidator } from '#validators/article'
import { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  /*
  This function returns all the articles that exists through the website
  */
  async getAllArticle({ response }: HttpContext) {
    //let nbElement = await Article.query().count('* as total')
    //let nbPage = Math.floor(nbElement[0].$extras.total / 9) + 1
    const query = await Article.query().orderBy('created_at', 'desc')
    return response.status(200).json(query)
  }
  //Function that handle the creation of an article
  async publishArticles({ request, response, auth }: HttpContext) {
    const payload = request.validateUsing(ArticleValidator)
    try {
      const userId = auth.user?.id
      if (userId) {
        payload.then((data) => {
          Article.create({ ...data, author_id: userId })
        })
        ws.io?.emit('ping', { message: 'A new article has been published' })
        return response.status(201).json({ message: 'Article created' })
      }
    } catch (error) {
      return response.status(400).json({ message: 'Failed to create article' })
    }
  }

  async getArticleById({ params, response }: HttpContext) {
    const article = await Article.findBy('id', params.id)
    if (article) {
      return response
        .status(200)
        .json({ id: article.id, title: article.title, content: article.content })
    } else {
      return response.status(204).json({ message: 'No article with this id' })
    }
  }

  async getMyArticle({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const articles = await Article.query().where('author_id', '=', user.id)
    return response.status(200).json(articles)
  }

  //Function that handle the delete of an article
  async deleteArticle({ request, response, auth }: HttpContext) {
    const id = request.toJSON().body.id
    const article = await Article.query().where('id', '=', id).firstOrFail()
    const user = auth.user
    if (user && (article.author_id === user.id || user.roleId === Roles.ADMIN)) {
      await article.delete()
      return response.status(200).json({ message: 'article successfully deleted' })
    } else {
      return response.status(401)
    }
  }
}
