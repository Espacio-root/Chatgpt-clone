import { Plus } from 'lucide-react';
import { FC, useContext } from 'react'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import Button from './ui/Button'
import { MessageContext } from '@/context/messages';
import { addPrismaChat } from '@/lib/prisma-helper';
import { useRouter } from 'next/navigation';

interface AddChatProps {
    session: any
}

const AddChat: FC<AddChatProps> = ({session}) => {
  const {chats, setChats} = useContext(MessageContext)
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        variant="ghostBorder"
        size="full"
        className="inline-flex relative flex-1 pl-3 pr-1 md:px-3 justify-center md:justify-start"
        onClick={async () => {
          const res = await addPrismaChat(session?.user?.id, "New Chat");
          router.push(`/chat/${res.data.id}`);
          setChats([...chats, res.data]);
        }}
      >
        <Plus size={20} className="mr-2" />
        <span className="tracking-wide hidden md:block">New Chat</span>
      </Button>
      <Button variant="ghostBorder" size="full" className="px-3 w-auto z-20 hidden md:block">
        <BsReverseLayoutTextSidebarReverse size={20} className="mr-2" />
      </Button>
    </div>
  );
};

export default AddChat;
