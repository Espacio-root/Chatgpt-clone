import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route';

const Chat = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <main className="relative flex-1 flex flex-col bg-primary-bg">
      <ChatMessages className="flex-1" />
      <div className='bg-[#343541] h-[128px] md:h-[192px]'></div>
      <ChatInput className="absolute inset-x-0 bottom-0" />
    </main>
  );
}

export default Chat;
