
import React from 'react';
import type { SwotData } from '@/types/swot';
import { Briefcase, Target, Rocket } from 'lucide-react';
import { InfoCard } from './InfoCard';
import { QuadrantDisplay } from './QuadrantDisplay';

interface SwotDashboardProps {
  data: SwotData;
}

export function SwotDashboard({ data }: SwotDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ minHeight: '600px' }}>
        {data.swot.strengths && <QuadrantDisplay quadrantName="strengths" quadrantData={data.swot.strengths} />}
        {data.swot.weaknesses && <QuadrantDisplay quadrantName="weaknesses" quadrantData={data.swot.weaknesses} />}
        {data.swot.opportunities && <QuadrantDisplay quadrantName="opportunities" quadrantData={data.swot.opportunities} />}
        {data.swot.threats && <QuadrantDisplay quadrantName="threats" quadrantData={data.swot.threats} />}
      </div>
    </div>
  );
}
