
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportGenerator } from './ReportGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, Rocket, DollarSign, Sparkles } from 'lucide-react';

interface ReportTabsProps {
  initialPrompt: string;
}

export function ReportTabs({ initialPrompt }: ReportTabsProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Your Cosmic AI Blueprint
          </h1>
          <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-gray-400 text-lg">
          Navigate through your personalized AI strategy constellation
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-700/50">
          <TabsTrigger 
            value="opportunities" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <Target className="h-4 w-4 mr-2" />
            Opportunities
          </TabsTrigger>
          <TabsTrigger 
            value="recommendations" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger 
            value="roadmap" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Implementation Roadmap
          </TabsTrigger>
          <TabsTrigger 
            value="swot" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            SWOT Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="mt-8">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-400 flex items-center space-x-2">
                <Target className="h-6 w-6" />
                <span>Cosmic Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportGenerator initialPrompt={`${initialPrompt}\n\nPlease provide a detailed analysis of AI opportunities for this business.`} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-8">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400 flex items-center space-x-2">
                <Lightbulb className="h-6 w-6" />
                <span>Strategic Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportGenerator initialPrompt={`${initialPrompt}\n\nPlease provide specific AI recommendations and strategic guidance for this business.`} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="mt-8">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400 flex items-center space-x-2">
                <Rocket className="h-6 w-6" />
                <span>Implementation Roadmap</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportGenerator initialPrompt={`${initialPrompt}\n\nPlease provide a detailed implementation roadmap with timeline and milestones for AI adoption.`} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swot" className="mt-8">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400 flex items-center space-x-2">
                <DollarSign className="h-6 w-6" />
                <span>SWOT Analysis & Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportGenerator initialPrompt={`${initialPrompt}\n\nPlease provide a comprehensive SWOT analysis and detailed cost breakdown for AI implementation.`} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
