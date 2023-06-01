'use client';

import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

const defaultValue = [
    {
        id: nanoid(),
        text: 'Hello, how can I help you?',
        isUserMessage: false,
    }
]

interface MessageContextType {
    messages: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, newMessage: string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}

export const MessageContext = createContext<MessageContextType>(
    {
        messages: [],
        isMessageUpdating: false,
        addMessage: () => {},
        removeMessage: () => {},
        updateMessage: () => {},
        setIsMessageUpdating: () => {}
    }
)

export function MessageProvider({children} : {children: React.ReactNode}) {
    const [messages, setMessages] = useState<Message[]>(defaultValue)
    const [isMessageUpdating, setIsMessageUpdating] = useState(false)

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
    }

    const updateMessage = (id: string, newMessage: string) => {
        setMessages((prev) => prev.map((m) => {
            if (m.id === id) {
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
            messages,
            isMessageUpdating,
            addMessage,
            removeMessage,
            updateMessage,
            setIsMessageUpdating,
        }}>
            {children}
        </MessageContext.Provider>
    )
}