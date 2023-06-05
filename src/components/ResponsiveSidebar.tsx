"use client";

import { MessageContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { FC, useContext, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import AddChat from "./AddChat";
import Sidebar from "./Sidebar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session;
}

const ResponsiveSidebar: FC<SidebarProps> = ({
  className,
  session,
  ...props
}) => {
  const { chats } = useContext(MessageContext);
  const [modal, setModal] = useState(false);
  const curChatId = window.location.href.split("/").pop();
  const chatName = chats.find((chat) => chat.id === curChatId)?.name;

  return (
    <>
      <div
        className={cn(
          "flex w-screen justify-between md:hidden px-3 items-center",
          className
        )}
        {...props}
      >
        <BiMenuAltLeft
          size={24}
          className="cursor-pointer"
          onClick={() => setModal(!modal)}
        />
        <p>{chatName}</p>
        <AddChat session={session} />
      </div>
      <Sidebar className="w-[280px] hidden md:block" session={session} />
      {modal && (
        <div className="w-screen h-screen">
          <div
            className="absolute inset-0 bg-white bg-opacity-20 z-20"
            onClick={(e) => {
              e.stopPropagation();
              setModal(!modal);
            }}
          ></div>
          <div className="flex absolute top-0 left-0 z-30 h-screen animate-slide-in-left">
            <Sidebar className="w-[280px] h-full" session={session} />
            <IoClose
              onClick={() => setModal(!modal)}
              className="border-4 text-white mx-2 my-2 cursor-pointer"
              size={48}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveSidebar;
