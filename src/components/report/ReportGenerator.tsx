import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, FileText, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { aiconfigs } from '@/config';
import { ReportDisplay } from './ReportDisplay';
import { Skeleton } from "@/components/ui/skeleton";

interface AgentConfig {
  apiKey: string;
  apiUrl: string;
  userId: string;
  agentId: string;
  sessionId: string;
}

async function getAiResponse({ message, agentConfig }: { message: string, agentConfig: AgentConfig }): Promise<string> {
  const response = await fetch(agentConfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': agentConfig.apiKey,
    },
    body: JSON.stringify({
      user_id: agentConfig.userId,
      agent_id: agentConfig.agentId,
      session_id: agentConfig.sessionId,
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

async function generateCombinedReport(message: string): Promise<string> {
  // Call both APIs in parallel
  const promises = aiconfigs.map(agentConfig => 
    getAiResponse({ message, agentConfig })
  );
  
  const results = await Promise.all(promises);
  
  // Combine results with headers and a separator
  return results.map((res, index) => `## Part ${index + 1} of the Report\n\n${res}`).join('\n\n---\n\n');
}

interface ReportGeneratorProps {
  initialPrompt: string;
}

export function ReportGenerator({ initialPrompt }: ReportGeneratorProps) {
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: generateCombinedReport,
    onSuccess: (data) => {
      setReport(data);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Cosmic Anomaly Detected!',
        description: "Failed to generate blueprint. Please try again or contact mission control.",
      });
    },
  });

  useEffect(() => {
    if (initialPrompt && !mutation.isPending && !report) {
      mutation.mutate(initialPrompt);
    }
  }, [initialPrompt, mutation, report]);

  const handleDownload = () => {
    if (!report) return;
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetherius-labs-blueprint.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
       <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          Your AI Blueprint
        </h2>
        {report && !mutation.isPending && (
            <Button onClick={handleDownload} variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Download Blueprint
            </Button>
        )}
      </div>


      <div className="flex-1 min-h-[500px]">
        {mutation.isPending && (
          <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-card/50">
            <h3 className="text-xl font-semibold text-primary animate-pulse">Generating your cosmic blueprint...</h3>
            <Skeleton className="h-8 w-1/3 bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-4/5 bg-muted/50" />
            <Skeleton className="h-4 w-full mt-4 bg-muted/50" />
            <Skeleton className="h-4 w-2/3 bg-muted/50" />
          </div>
        )}
        
        {report && !mutation.isPending && <ReportDisplay content={report} />}
        
        {mutation.isError && (
          <div className="flex flex-col items-center justify-center text-center text-destructive h-full border-2 border-dashed border-destructive/50 rounded-xl p-8 bg-destructive/20">
             <FileText className="h-12 w-12 mb-4" />
             <h3 className="text-lg font-semibold">Cosmic Anomaly Detected!</h3>
             <p className="text-sm">We encountered an issue while generating your report. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
