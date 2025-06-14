
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, LoaderCircle, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { aiconfig } from '@/config';
import { ReportDisplay } from './ReportDisplay';
import { Skeleton } from "@/components/ui/skeleton";

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
  let aiMessage = data.response || "Sorry, I couldn't get a response.";

  try {
    const parsed = JSON.parse(aiMessage);
    if (parsed && typeof parsed === 'object' && parsed !== null) {
      if (typeof parsed.response === 'string') {
        aiMessage = parsed.response;
      } else {
        const firstStringValue = Object.values(parsed).find((v) => typeof v === 'string');
        if (firstStringValue) {
          aiMessage = firstStringValue as string;
        } else {
          aiMessage = 'Could not extract a readable message from the AI response.';
        }
      }
    } else if (typeof parsed === 'string') {
      aiMessage = parsed;
    }
  } catch (e) {
    // Not a JSON string
  }

  return aiMessage;
}


export function ReportGenerator() {
  const [prompt, setPrompt] = useState('');
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getAiResponse,
    onSuccess: (data) => {
      setReport(data);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error generating report',
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || mutation.isPending) return;
    setReport(null);
    mutation.mutate(prompt.trim());
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          What report would you like to generate?
        </h2>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A summary of Q2 sales figures, highlighting top-performing regions and products.'"
          className="min-h-[100px] text-base"
          disabled={mutation.isPending}
        />
        <Button type="submit" disabled={!prompt.trim() || mutation.isPending} size="lg">
          {mutation.isPending ? (
            <LoaderCircle className="mr-2" />
          ) : (
            <Send className="mr-2" />
          )}
          Generate Report
        </Button>
      </form>

      <div className="flex-1 min-h-[300px]">
        {mutation.isPending && (
          <div className="space-y-4 p-6 border rounded-xl">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
        
        {report && !mutation.isPending && <ReportDisplay content={report} />}
        
        {!report && !mutation.isPending && (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full border-2 border-dashed rounded-xl p-8">
             <FileText className="h-12 w-12 mb-4" />
             <h3 className="text-lg font-semibold">Your generated report will appear here</h3>
             <p className="text-sm">Enter a prompt above and click "Generate Report" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
