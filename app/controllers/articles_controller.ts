// import type { HttpContext } from '@adonisjs/core/http'

import Article from '#models/article'
import { ArticleValidator } from '#validators/article'
import { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  /*
  This function returns all the articles that exists through the website
  */
  async getAllArticle({ response }: HttpContext) {
    const query = await Article.query().orderBy('created_at', 'asc')
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
        return response.status(201).json({ message: 'Article created' })
      }
    } catch (error) {
      return response.status(400).json({ message: 'Failed to create article' })
    }
  }
  //Function that handle the delete of an article
  async deleteArticle({ request, response }: HttpContext) {
    console.log(request)
    return response.status(200).json({ message: 'article successfully deleted' })
  }
}
