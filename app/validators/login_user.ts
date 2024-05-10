import vine from '@vinejs/vine'

export const LoginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().maxLength(180),
  })
)
