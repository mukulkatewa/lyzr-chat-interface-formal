
import React from 'react';
import { SwotData } from '@/types/swot';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type QuadrantName = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

interface SwotGridProps {
  swotData: SwotData['swot'];
  onSelectQuadrant: (quadrant: QuadrantName) => void;
}

const quadrantConfig = {
  strengths: { title: 'Strengths', color: 'text-green-400', bgColor: 'hover:bg-green-500/10', borderColor: 'hover:border-green-400/50' },
  weaknesses: { title: 'Weaknesses', color: 'text-amber-400', bgColor: 'hover:bg-amber-500/10', borderColor: 'hover:border-amber-400/50' },
  opportunities: { title: 'Opportunities', color: 'text-blue-400', bgColor: 'hover:bg-blue-500/10', borderColor: 'hover:border-blue-400/50' },
  threats: { title: 'Threats', color: 'text-red-400', bgColor: 'hover:bg-red-500/10', borderColor: 'hover:border-red-400/50' },
};

export function SwotGrid({ swotData, onSelectQuadrant }: SwotGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {(Object.keys(swotData) as QuadrantName[]).map((key) => {
        const config = quadrantConfig[key];
        const data = swotData[key];
        return (
          <Card
            key={key}
            onClick={() => onSelectQuadrant(key)}
            className={cn(
              'bg-card/30 border-white/10 cursor-pointer transition-all duration-300 flex flex-col',
              config.bgColor,
              config.borderColor
            )}
          >
            <CardHeader>
              <CardTitle className={`text-xl ${config.color}`}>{config.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-4xl font-bold">{data.summary_score}<span className="text-base font-normal text-muted-foreground">/5</span></p>
              <p className="text-xs text-muted-foreground mt-1">{data.items.length} items</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
