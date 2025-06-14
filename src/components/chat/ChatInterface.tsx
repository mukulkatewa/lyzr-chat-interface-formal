
import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage as ChatMessageType } from '@/types';
import { aiconfig } from '@/config';
import { ChatMessage } from './ChatMessage';

async function getAiResponse(message: string): Promise<string> {
  const response = await fetch(aiconfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': aiconfig.apiKey,
    },
    body: JSON.stringify({
      user_id: aiconfig.userId,
      agent_id: aiconfig.agentId,
      session_id: aiconfig.sessionId,
      message: message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error: ${response.statusText} - ${errorData}`);
  }

  const data = await response.json();
  console.log('API Response:', data);
  // Assuming the response has a 'response' field with the AI message.
  // This might need adjustment based on the actual API response structure.
  return data.response || "Sorry, I couldn't get a response.";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm your **Business Report AI Assistant**. How can I help you today? You can ask me for things like:\n\n*   A summary of recent sales figures.\n*   A draft for a project proposal.\n*   An analysis of market trends.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: getAiResponse,
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message if API fails
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || mutation.isPending) return;

    const userMessage: ChatMessageType = { role: 'user', content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    mutation.mutate(inputValue.trim());
    setInputValue('');
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {mutation.isPending && (
            <div className="flex items-start gap-4 rounded-lg px-4 py-3 text-sm bg-muted">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-primary text-primary-foreground">
                <LoaderCircle className="h-5 w-5 animate-spin" />
              </span>
              <div className="flex flex-col gap-1 items-start">
                <div className="rounded-lg p-3 bg-card border">
                  <p>Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={mutation.isPending}
          />
          <Button type="submit" disabled={!inputValue.trim() || mutation.isPending}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
