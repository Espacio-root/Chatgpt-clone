import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const Chat = async ({params} : {params: {chatId: string}}) => {
  const chatId = params.chatId[0]

  return (
    <main className="relative max-h-screen flex-1 flex flex-col bg-primary-bg">
      <ChatMessages className="flex-1 px-2 pt-2" chatId={chatId}/>
      <div className="bg-[#343541] h-[128px] md:h-[192px]"></div>
      <ChatInput className="absolute inset-x-0 bottom-0" chatId={chatId} />
    </main>
  );
};

export default Chat;
