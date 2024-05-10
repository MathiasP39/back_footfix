import vine from '@vinejs/vine'

export const RegisterUserValidator = vine.compile(
  vine.object({
    id: vine.string().optional(),
    fullName: vine.string().maxLength(50).minLength(2),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().maxLength(180),
  })
)
