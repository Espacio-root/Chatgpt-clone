import { cn } from '@/lib/utils';
import { FC } from 'react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

const Sidebar: FC<SidebarProps> = ({className, ...props}) => {
  return (
    <div {...props} className={cn('bg-sidebar-bg text-white', className)}>
      Sidebar
    </div>
  )
};

export default Sidebar;
