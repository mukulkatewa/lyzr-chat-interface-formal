
import React from 'react';
import { SwotItem } from '@/types/swot';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreCircle } from './ScoreCircle';
import { Link, Lightbulb } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SwotItemCardProps {
  item: SwotItem;
  quadrantName: string;
}

const quadrantColors: { [key: string]: string } = {
  strengths: '#22c55e',
  weaknesses: '#f59e0b',
  opportunities: '#3b82f6',
  threats: '#ef4444',
};

export function SwotItemCard({ item, quadrantName }: SwotItemCardProps) {
  const color = quadrantColors[quadrantName] || '#888';

  const renderDescription = () => {
    if (typeof item.description === 'object' && item.description !== null) {
      return (
        <ul className="space-y-1">
          {Object.entries(item.description).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize text-foreground/90">{key.replace(/_/g, ' ')}:</span> {value}
            </li>
          ))}
        </ul>
      );
    }
    return <p>{String(item.description)}</p>;
  };

  return (
    <Card className="bg-card/50 border-white/10">
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex-shrink-0">
          <ScoreCircle score={item.score} color={color} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{item.title}</h4>
          <div className="text-sm text-muted-foreground mt-2">
            {renderDescription()}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:text-primary transition-colors"><Link size={16} /></button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link to Goal</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:text-primary transition-colors"><Lightbulb size={16} /></button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link to Opportunity</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
