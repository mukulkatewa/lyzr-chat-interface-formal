
import React from 'react';
import { SwotQuadrant } from '@/types/swot';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SwotItemCard } from './SwotItemCard';

interface QuadrantDetailViewProps {
  quadrantName: string;
  quadrantData: SwotQuadrant;
  onBack: () => void;
}

const quadrantConfig: { [key: string]: { title: string; color: string; summary: string } } = {
  strengths: { title: 'Strengths', color: 'text-green-400', summary: 'Exploring the internal capabilities that give our business a competitive advantage.' },
  weaknesses: { title: 'Weaknesses', color: 'text-amber-400', summary: 'Identifying internal limitations that may hinder performance.' },
  opportunities: { title: 'Opportunities', color: 'text-blue-400', summary: 'Analyzing external factors that the business could capitalize on to its advantage.' },
  threats: { title: 'Threats', color: 'text-red-400', summary: 'Assessing external challenges that could jeopardize the business.' },
};

export function QuadrantDetailView({ quadrantName, quadrantData, onBack }: QuadrantDetailViewProps) {
  const config = quadrantConfig[quadrantName] || { title: quadrantName, color: 'text-primary', summary: ''};
  const normalizedQuadrantName = quadrantName.charAt(0).toUpperCase() + quadrantName.slice(1);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 px-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h2 className={`text-3xl font-bold ${config.color}`}>{normalizedQuadrantName}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">{config.summary}</p>
      </div>
      <div className="space-y-4">
        {quadrantData.items.map((item, index) => (
          <SwotItemCard key={index} item={item} quadrantName={quadrantName} />
        ))}
      </div>
    </div>
  );
}
