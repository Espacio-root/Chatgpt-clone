import { z } from 'zod'

export const messageSchema = z.object({
    id: z.string(),
    text: z.string(),
    isUserMessage: z.boolean(),
})

export const messageArraySchema = z.array(messageSchema)

export type Message = z.infer<typeof messageSchema>