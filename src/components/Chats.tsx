"use client";

import { addPrismaChat, getPrismaChats } from "@/lib/prisma-helper";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { BiMessageDetail } from "react-icons/bi";
import {
  BsPen,
  BsReverseLayoutTextSidebarReverse,
  BsTrash,
} from "react-icons/bs";
import { Plus } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai"
import axios from "axios";
import { MessageContext } from "@/context/messages";
import AddChat from "./AddChat";

export default function Chats({ session }: { session: any }) {
  const {chats, setChats} = useContext(MessageContext)
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const curChatId = window.location.href.split("/").pop();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getPrismaChats(session?.user?.id);
      if (data) {
        setChats(data);
      }
    };
    if (chats.length === 0) {
      fetchdata();
    }
  }, []);

  useEffect(() => {
    if (typing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [typing]);

  return (
    <>
      <AddChat session={session} />
      <div className="flex-1 flex flex-col ">
        {chats.map((chat: any) => (
          <Button
            key={chat.id}
            variant="ghost"
            size="full"
            className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer overflow-x-hidden ${
              curChatId === chat.id && "bg-gray-200 bg-opacity-20 z-20"
            }`}
            onClick={() => {
              router.push(`/chat/${chat.id}`);
            }}
          >
            <div className="flex flex-1 relative items-center overflow-hidden">
              <BiMessageDetail size={24} />
              {typing ? (
                <input
                  type="text"
                  value={input}
                  ref={inputRef}
                  onChange={(e) => setInput(e.target.value)}
                  className="ml-2 bg-transparent border-none"
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await axios.post("/api/prisma/chat/update", {
                        chatId: chat.id,
                        newName: input,
                      });
                      setChats(
                        chats.map((c: any) => {
                          if (c.id === chat.id) {
                            c.name = input;
                          }
                          return c;
                        })
                      );
                      setTyping(false);
                      setInput("");
                    }
                  }}
                />
              ) : (
                <p className="text-md ml-2 whitespace-nowrap break-all">
                  {chat.name}
                </p>
              )}
              <p>...</p>
            </div>
            {curChatId === chat.id && (
              <div className="flex items-center gap-2 ml-2">
                <BsPen
                  onClick={() => {
                    setTyping(true);
                  }}
                  size={16}
                  className="text-slate-400 hover:text-white"
                />
                <BsTrash
                  onClick={async () => {
                    await axios.post("/api/prisma/chat/delete", {
                      chatId: chat.id,
                    });
                    setChats(
                      chats.filter((c: any) => {
                        return c.id !== chat.id;
                      })
                    );
                    router.push(`/chat/${chats[0].id}`);
                  }}
                  size={16}
                  className="text-slate-400 hover:text-white"
                />
              </div>
            )}
          </Button>
        ))}
      </div>

    </>
  );
}
