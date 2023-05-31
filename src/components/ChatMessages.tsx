import { cn } from '@/lib/utils';
import { FC } from 'react'

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

const ChatMessages: FC<ChatMessagesProps> = ({className, ...props}) => {
  return (
    <div {...props} className={cn('', className)}>
      ChatMessages
    </div>
  )
};

export default ChatMessages;
