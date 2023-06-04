import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Message } from "./validators/message"
import { MessageContext } from "@/context/messages"
import { useContext } from "react"

// export const getMessages = (chatId: string) => useQuery({
//   queryKey: ['messages', chatId],
//   queryFn: async () => {
//     const res = await axios.get(`/api/prisma/message/?chatId=${chatId}`)
//     return res.data
//   },
// })

export const getMessages = async (chatId: string) => {
    const res = await axios.get(`/api/prisma/message/?chatId=${chatId}`)
    return res.data
}

export const addPrismaMessage = async (message: Message) => {
    const parsedMessage = JSON.stringify(message)
    const res = await axios.post(`/api/prisma/message`, {
        message: parsedMessage
    })
    return res.status
}