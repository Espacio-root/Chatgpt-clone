import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative flex-1 flex flex-col bg-primary-bg">
      <ChatMessages className="flex-1" />
      <div className='bg-[#343541] h-[128px] md:h-[192px]'></div>
      <ChatInput className="absolute inset-x-0 bottom-0" />
    </main>
  );
}
