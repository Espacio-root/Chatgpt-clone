'use client';

import { addPrismaMessage } from "@/lib/prisma-helper";
import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

const defaultValue = [
    {
        chatId: '',
        id: nanoid(),
        text: '',
        isUserMessage: false,
    }
]

interface MessageContextType {
    chats: any[]
    setChats: (chats: any[]) => void
    messages: Message[]
    isMessageUpdating: boolean
    getMessage: (id: string) => Message
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, newMessage: string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
    setMessages: (messages: Message[]) => void
}

export const MessageContext = createContext<MessageContextType>(
    {
        chats: [],
        setChats: () => {},
        messages: [],
        isMessageUpdating: false,
        getMessage: () => defaultValue[0],
        addMessage: () => {},
        removeMessage: () => {},
        updateMessage: () => {},
        setIsMessageUpdating: () => {},
        setMessages: () => {},
    }
)

export function MessageProvider({children} : {children: React.ReactNode}) {
    const [messages, setMessages] = useState<Message[]>(defaultValue)
    const [isMessageUpdating, setIsMessageUpdating] = useState(false)

    const [chats, setChats] = useState([] as any);

    const getMessage =  (id: string) => {
        return messages.find((m) => m.id === id)!
    }

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
    }

    const updateMessage = (id: string, newMessage: string) => {
        setMessages((prev) => prev.map((m) => {
            if (m.id === id) {
                if (newMessage === '[DONE]') {
                    addPrismaMessage(m)
                    return {
                        ...m,
                        text: m.text,
                    }
                }
                return {
                    ...m,
                    text: m.text + newMessage
                }
            }
            return m
        })
    )}
    

    return (
        <MessageContext.Provider value={{
            chats,
            setChats,
            messages,
            isMessageUpdating,
            getMessage,
            addMessage,
            removeMessage,
            updateMessage,
            setIsMessageUpdating,
            setMessages,
        }}>
            {children}
        </MessageContext.Provider>
    )
}