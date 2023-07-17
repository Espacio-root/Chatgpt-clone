'use client';

import { MessageContext } from "@/context/messages";
import { getMessages } from "@/lib/prisma-helper";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useContext, useEffect } from "react";

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  chatId: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className, chatId, ...props }) => {
  const { messages, setMessages } = useContext(MessageContext);
  
  useEffect(() => {
    const fetchdata = async () => { 
      const data = await getMessages(chatId)
      if (data) {
        setMessages(data);
      }
    }
    fetchdata()
  }, [chatId])

  return (
    <div {...props} className={cn("overflow-y-scroll overflow-x-hidden", className)}>
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          message.text && 
          <div
            key={index}
            className={`px-4 py-3 rounded-lg text-white max-w-[50%] ${
              message.isUserMessage
                ? "bg-blue-600 place-self-end"
                : "bg-gray-600 place-self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
