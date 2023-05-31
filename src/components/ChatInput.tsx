"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Send, ArrowDown, Repeat } from "lucide-react";
import Button from "./ui/Button";

interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col justify-end pt-8 px-8", className)}
    >
      <div className="grid grid-cols-3 place-items-end">
        <Button variant='default' size='default' className='col-span-2'>
            <Repeat className='h-5 w-5'/>
            <span className='text-sm ps-2'>Regenerate Response</span>
        </Button>
        <div className="bg-white bg-opacity-10 rounded-full p-1 border border-white border-opacity-30">
          <ArrowDown className="text-white h-5 w-5" />
        </div>
      </div>
      <div className="relative mt-4">
        <TextareaAutosize
          rows={2}
          maxRows={12}
          placeholder="Send a message."
          className="bg-[#40414F] w-full text-white resize-none outline-none rounded-lg py-[10px] px-3"
        />
        <kbd className="absolute inset-y-0 right-0 py-[5px] px-[5px]">
          <div className="hover:bg-green-400 rounded-md group py-[5px] px-[5px]">
            <Send className="h-6 w-6 text-slate-400 rotate-45 -translate-x-1 group-hover:text-white" />
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
