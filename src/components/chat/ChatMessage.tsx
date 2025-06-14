
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser && 'justify-end'
      )}
    >
      {!isUser && (
        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full items-center justify-center bg-primary/10 text-primary">
          <Bot className="h-4 w-4" />
        </span>
      )}
      <div className={cn(
        'flex flex-col gap-1 w-full max-w-[85%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-xl px-4 py-2 prose prose-sm max-w-full dark:prose-invert',
          isUser 
            ? 'bg-primary text-primary-foreground prose-invert' 
            : 'bg-muted'
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80" />,
              p: ({node, ...props}) => <p {...props} className="my-0" />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full items-center justify-center bg-muted">
          <User className="h-4 w-4 text-foreground" />
        </span>
      )}
    </div>
  );
}
