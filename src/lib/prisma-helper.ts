import axios from "axios"
import { Message } from "./validators/message"

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

export const getPrismaChats = async (user: string) => {
    const res = await axios.get(`/api/prisma/chat/?user=${user}`)
    return res.data
}

export const addPrismaChat = async (userId: string, name: string) => {
    const res = await axios.post(`/api/prisma/chat`, {
        userId: userId,
        name: name
    })
    return res
}