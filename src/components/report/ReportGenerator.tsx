
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Download, FileText, Sparkles } from 'lucide-react';

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
          aiMessage = JSON.stringify(parsed);
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

async function generateCombinedReport(message: string): Promise<string[]> {
  const promises = aiconfigs.map(agentConfig => 
    getAiResponse({ message, agentConfig })
  );
  
  return Promise.all(promises);
}

interface ReportGeneratorProps {
  initialPrompt: string;
}

export function ReportGenerator({ initialPrompt }: ReportGeneratorProps) {
  const [reportData, setReportData] = useState<string | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: generateCombinedReport,
    onSuccess: (data) => {
      // Always treat the response as markdown content
      setReportData(data.join('\n\n---\n\n'));
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
    if (initialPrompt && !mutation.isPending && !reportData) {
      mutation.mutate(initialPrompt);
    }
  }, [initialPrompt, mutation, reportData]);

  const handleDownload = () => {
    if (!reportData) return;

    const content = reportData;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetherius-labs-blueprint.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    if (mutation.isPending) {
      return (
        <div className="space-y-6 p-8 border border-slate-700/50 rounded-xl bg-slate-900/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-400 animate-spin" />
            <h3 className="text-xl font-semibold text-cyan-400 animate-pulse">
              Generating your cosmic blueprint...
            </h3>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2 bg-slate-700/50" />
            <Skeleton className="h-4 w-full bg-slate-700/50" />
            <Skeleton className="h-4 w-full bg-slate-700/50" />
            <Skeleton className="h-4 w-3/4 bg-slate-700/50" />
            <Skeleton className="h-4 w-full mt-6 bg-slate-700/50" />
            <Skeleton className="h-4 w-2/3 bg-slate-700/50" />
          </div>
        </div>
      );
    }

    if (mutation.isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400 h-64 border-2 border-dashed border-red-500/50 rounded-xl p-8 bg-red-900/10">
           <FileText className="h-16 w-16 mb-4" />
           <h3 className="text-lg font-semibold">Cosmic Anomaly Detected!</h3>
           <p className="text-sm text-gray-400">We encountered a temporal distortion while generating your report. Please try again.</p>
        </div>
      );
    }

    if (reportData) {
      return <ReportDisplay content={reportData} />;
    }

    return null;
  }

  return (
    <div className="space-y-6">
      {reportData && !mutation.isPending && (
        <div className="flex justify-end">
          <Button 
            onClick={handleDownload} 
            variant="outline"
            className="bg-slate-800/50 border-slate-600/50 text-gray-200 hover:bg-slate-700/50 hover:border-cyan-400/50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Blueprint
          </Button>
        </div>
      )}

      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
}
