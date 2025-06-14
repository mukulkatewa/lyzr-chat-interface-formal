
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
        'flex items-start gap-4 rounded-lg px-4 py-3 text-sm',
        isUser ? 'justify-end' : 'bg-muted'
      )}
    >
      {!isUser && (
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </span>
      )}
      <div className={cn(
        'flex flex-col gap-1 w-full max-w-[85%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-lg px-3 py-2 prose prose-sm max-w-full dark:prose-invert',
          isUser ? 'bg-primary text-primary-foreground prose-invert' : 'bg-card border'
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-card border">
          <User className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}
