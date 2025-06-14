
export interface SwotItem {
  title: string;
  score: number;
  description: {
    [key: string]: string;
  };
  tags: string[];
}

export interface SwotQuadrant {
  summary_score: number;
  items: SwotItem[];
}

export interface SwotData {
  business_profile: {
    industry: string;
    size: string;
    revenue: string;
  };
  key_challenges: string[];
  ai_goals: string[];
  swot: {
    strengths: SwotQuadrant;
    weaknesses: SwotQuadrant;
    opportunities: SwotQuadrant;
    threats: SwotQuadrant;
  };
}
