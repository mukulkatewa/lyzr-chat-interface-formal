
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { ReportTabs } from '@/components/report/ReportTabs';

const ReportPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get('prompt');

  return (
    <Layout>
      <div className="container mx-auto h-full max-w-6xl py-8">
        {prompt ? (
          <ReportTabs initialPrompt={prompt} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-200">No cosmic coordinates provided.</h2>
            <p className="text-gray-400 mt-2">Please return to the Nebula Navigator to chart your course.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportPage;
