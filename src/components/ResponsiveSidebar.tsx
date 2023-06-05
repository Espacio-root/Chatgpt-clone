'use client';

import { MessageContext } from '@/context/messages';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import { FC, useContext } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi';
import AddChat from './AddChat';
import Sidebar from './Sidebar';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session;
}

const ResponsiveSidebar: FC<SidebarProps> = ({ className, session, ...props }) => {
  const {chats} = useContext(MessageContext);
  const curChatId = window.location.href.split("/").pop();
  const chatName = chats.find((chat) => chat.id === curChatId)?.name;

  return (
    <>
    <div className={cn("flex w-screen justify-between md:hidden px-3 items-center", className)} {...props}>
      <BiMenuAltLeft size={24} />
      <p>{chatName}</p>
      <AddChat session={session} />
    </div>
    <Sidebar className='w-[240px] hidden md:block' session={session} />
    </>
  );
}

export default ResponsiveSidebar
