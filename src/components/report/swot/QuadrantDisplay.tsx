
import React from 'react';
import { SwotQuadrant } from '@/types/swot';
import { SwotItemCard } from './SwotItemCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuadrantDisplayProps {
  quadrantName: string;
  quadrantData: SwotQuadrant;
}

const quadrantConfig: { [key: string]: { title: string; color: string; summary: string } } = {
  strengths: { title: 'Strengths', color: 'text-green-400', summary: 'Internal capabilities that provide a competitive advantage.' },
  weaknesses: { title: 'Weaknesses', color: 'text-amber-400', summary: 'Internal limitations that may hinder performance.' },
  opportunities: { title: 'Opportunities', color: 'text-blue-400', summary: 'External factors the business could capitalize on.' },
  threats: { title: 'Threats', color: 'text-red-400', summary: 'External challenges that could jeopardize the business.' },
};

export function QuadrantDisplay({ quadrantName, quadrantData }: QuadrantDisplayProps) {
  const config = quadrantConfig[quadrantName] || { title: quadrantName, color: 'text-primary', summary: ''};

  return (
    <Card className="bg-card/50 border-white/10 flex flex-col h-full">
      <CardHeader>
        <CardTitle className={`text-xl ${config.color}`}>{config.title}</CardTitle>
        <CardDescription>{config.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-4">
            {quadrantData.items.map((item, index) => (
              <SwotItemCard key={index} item={item} quadrantName={quadrantName} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
