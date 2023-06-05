import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ResponsiveSidebar from '@/components/ResponsiveSidebar';
import { Session, getServerSession } from 'next-auth';
import { FC, ReactNode } from 'react'

const ChatLayout = async ({children}: {children: ReactNode}) => {
  const session = await getServerSession(authOptions) as Session
  return (
        <main className="absolute inset-0 flex flex-col md:flex-row">
            <ResponsiveSidebar session={session} />
            {children}
        </main>
  )
};

export default ChatLayout;
