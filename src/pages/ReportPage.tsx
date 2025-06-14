
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { ReportGenerator } from '@/components/report/ReportGenerator';

const ReportPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get('prompt');

  return (
    <Layout>
      <div className="container mx-auto h-full max-w-4xl py-8">
        {prompt ? (
          <ReportGenerator initialPrompt={prompt} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No prompt provided.</h2>
            <p className="text-muted-foreground mt-2">Please go back to the questionnaire to generate a report.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportPage;
