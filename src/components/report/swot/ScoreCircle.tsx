
import React from 'react';

interface ScoreCircleProps {
  score: number;
  color: string;
}

export function ScoreCircle({ score, color }: ScoreCircleProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const percentage = score / 5;
  const offset = circumference - percentage * circumference;

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 60 60">
        <circle
          className="text-muted/20"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="30"
          cy="30"
        />
        <circle
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx="30"
          cy="30"
        />
      </svg>
      <span className="absolute text-xl font-bold" style={{ color }}>{score}</span>
    </div>
  );
}
