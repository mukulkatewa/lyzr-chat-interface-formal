
import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, LoaderCircle, Bot } from 'lucide-react';

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

  // The 'response' field might contain a stringified JSON. Let's try to parse it.
  let aiMessage = data.response || "Sorry, I couldn't get a response.";

  try {
    const parsed = JSON.parse(aiMessage);

    if (parsed && typeof parsed === 'object' && parsed !== null) {
      // If the parsed content is an object, we need to extract the message.
      // We'll prioritize a 'response' key, but fall back to the first string value we find.
      if (typeof parsed.response === 'string') {
        aiMessage = parsed.response;
      } else {
        const firstStringValue = Object.values(parsed).find(
          (v) => typeof v === 'string'
        );
        if (firstStringValue) {
          aiMessage = firstStringValue;
        } else {
          aiMessage =
            'Could not extract a readable message from the AI response.';
          console.error(
            'Could not find a string value in AI response object:',
            parsed
          );
        }
      }
    } else if (typeof parsed === 'string') {
      // Handles cases where the response is a JSON-encoded string like "\"Hello\""
      aiMessage = parsed;
    }
  } catch (e) {
    // If parsing fails, it's not a JSON string, so we'll use the original content.
  }

  return aiMessage;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm your **AI Assistant**. How can I help you today? You can ask me for things like:\n\n*   A summary of recent sales figures.\n*   A draft for a project proposal.\n*   An analysis of market trends.",
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
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {mutation.isPending && (
            <div className="flex items-start gap-3">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full items-center justify-center bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex flex-col gap-1 items-start">
                <div className="rounded-xl p-3 bg-muted border">
                  <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={mutation.isPending}
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || mutation.isPending}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
