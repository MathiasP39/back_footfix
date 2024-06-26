import vine from '@vinejs/vine'

export const CompositionValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
    name: vine.string(),
    joueurs: vine.array(
      vine.object({
        name: vine.string(),
        positionx: vine.number(),
        positiony: vine.number(),
        numero: vine.number(),
      })
    ),
  })
)
