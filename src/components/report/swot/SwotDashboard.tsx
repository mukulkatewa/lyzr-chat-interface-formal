
import React, { useState } from 'react';
import type { SwotData } from '@/types/swot';
import { Briefcase, Target, Rocket } from 'lucide-react';
import { InfoCard } from './InfoCard';
import { SwotGrid } from './SwotGrid';
import { QuadrantDetailView } from './QuadrantDetailView';

interface SwotDashboardProps {
  data: SwotData;
}

type QuadrantName = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

export function SwotDashboard({ data }: SwotDashboardProps) {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantName | null>(null);

  if (selectedQuadrant) {
    const quadrantData = data.swot[selectedQuadrant];
    if (!quadrantData) {
      // Handle case where data for selected quadrant is missing
      return <div>Error: Data for {selectedQuadrant} not found.</div>;
    }
    return (
      <QuadrantDetailView
        quadrantName={selectedQuadrant}
        quadrantData={quadrantData}
        onBack={() => setSelectedQuadrant(null)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <InfoCard title="Business Profile" icon={<Briefcase />}>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong className="text-foreground/80">Industry:</strong> {data.business_profile.industry}</li>
            <li><strong className="text-foreground/80">Size:</strong> {data.business_profile.size}</li>
            <li><strong className="text-foreground/80">Revenue:</strong> {data.business_profile.revenue}</li>
          </ul>
        </InfoCard>
        <InfoCard title="Key Challenges" icon={<Target />}>
           <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            {data.key_challenges.map((challenge, i) => <li key={i}>{challenge}</li>)}
          </ul>
        </InfoCard>
        <InfoCard title="Strategic AI Goals" icon={<Rocket />}>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            {data.ai_goals.map((goal, i) => <li key={i}>{goal}</li>)}
          </ul>
        </InfoCard>
      </div>
      <div className="lg:col-span-2">
        <SwotGrid swotData={data.swot} onSelectQuadrant={setSelectedQuadrant} />
      </div>
    </div>
  );
}
