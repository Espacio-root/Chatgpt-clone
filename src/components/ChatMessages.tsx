'use client';

import { MessageContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, useContext } from "react";

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessageContext);

  return (
    <div {...props} className={cn("overflow-y-scroll overflow-x-hidden", className)}>
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
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
