'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

const Sidebar: FC<SidebarProps> = ({className, ...props}) => {
  const { data: session } = useSession({required: true})
  return (
    <div {...props} className={cn('bg-sidebar-bg text-white', className)}>
      <div className='h-full flex flex-col'>
        <div className='flex-1 flex flex-col overflow-scroll'> 
          
        </div>
        <div className='flex'>
          <Image src={session?.user?.image!} width={32} height={32} alt='User Avatar' />
          <p>{session?.user?.name}</p>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
