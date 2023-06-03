import Sidebar from '@/components/Sidebar';
import { FC, ReactNode } from 'react'

interface layoutProps {
  children?: ReactNode
}

const ChatLayout: FC<layoutProps> = ({children}) => {
  return (
        <main className="absolute inset-0 flex">
            <Sidebar className="w-[260px]" />
            {children}
        </main>
  )
};

export default ChatLayout;
