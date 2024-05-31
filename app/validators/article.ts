import vine from '@vinejs/vine'

export const ArticleValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    content: vine.string(),
  })
)
