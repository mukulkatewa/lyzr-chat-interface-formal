
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';
import { cn } from '@/lib/utils';

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
        'flex flex-col gap-1',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-lg p-3',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-card border'
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
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
