"use client";

import { cn } from "@/lib/utils";
import { FC, useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Send, ArrowDown, Repeat } from "lucide-react";
import Button from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/lib/validators/message";
import { MessageContext } from "@/context/messages";
import { nanoid } from "nanoid";
import { StreamReader } from "@/lib/openai-stream";

interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState("");
  const {messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating} = useContext(MessageContext)
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async (_message: Message) => {
      const response = await fetch('/api/message', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ messages }),
      })

      return response.body
    },
    onMutate(message: Message) {
      addMessage(message)
    },
    onSuccess: async (stream : any) => {
      if (!stream) throw new Error('Stream Not Available')
      
      const id = nanoid()
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',
      }
      addMessage(responseMessage)
      
      // const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");
      StreamReader(stream, decoder, (newText) => updateMessage(id, newText))
    }
  })

  const handleSearch = () => {
    if (input.length === 0) return

    const message: Message = {
      id: nanoid(),
      text: input,
      isUserMessage: true,
    }

    setInput('')
    sendMessage(message)
  }
  return (
    <div
      {...props}
      className={cn("flex flex-col justify-end pt-8 px-8", className)}
    >
      <div className="grid grid-cols-3 place-items-end">
        <Button variant='default' size='default' className='place-self-center col-start-2'>
            <Repeat className='h-5 w-5'/>
            <span className='text-sm ps-2'>Regenerate Response</span>
        </Button>
        <div className="bg-white bg-opacity-10 rounded-full p-1 border border-white border-opacity-30">
          <ArrowDown className="text-white h-5 w-5" />
        </div>
      </div>
      <div className="relative flex justify-center items-center mt-4">
        <TextareaAutosize
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSearch();
          }}}
          rows={2}
          maxRows={12}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          className="bg-[#40414F] w-full max-w-[768px] text-white resize-none outline-none rounded-lg py-[10px] pl-3 pr-12"
        />
        <kbd className="absolute inset-y-0 right-0 py-[5px] px-[5px]">
          <div className={`${input.length > 0 && 'bg-green-400'} rounded-md group py-[5px] px-[5px]`}>
            <Send 
            onClick={handleSearch}
            className={`h-6 w-6 text-slate-400 rotate-45 -translate-x-1 ${input.length > 0 && 'text-white'}`} />
          </div>
        </kbd>
      </div>
      <div className="flex justify-center items-center mt-4 mb-2">
        <p className="text-center text-xs text-white">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts. ChatGPT May 24 Version
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
