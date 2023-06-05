import { cn } from "@/lib/utils";
import { FC } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chats from "./Chats";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "./ui/Button";
import { AiOutlineUser } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session;
}

const Sidebar: FC<SidebarProps> = ({ className, session, ...props }) => {
  return (
    <div
      {...props}
      className={cn("bg-sidebar-bg text-white relative", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-80% to-sidebar-bg"></div>
      <div className="h-full flex flex-col px-2 py-2 gap-3">
        <Chats session={session} />

        <div className="flex flex-col gap-2 px-3">
          <Button
            variant='ghost'
            size='full'
            className='flex gap-2 justify-start px-0 py-0 h-auto'
          >
            <AiOutlineUser size={20}/>
            <p className='text-'>Renew Plus</p>
          </Button>
          <Button 
          variant='ghost'
          size='full'
          className="flex justify-start px-0 gap-2">
            <Image
              src={session?.user?.image!}
              width={24}
              height={24}
              alt="User Avatar"
            />
            <p>{session?.user?.name}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
