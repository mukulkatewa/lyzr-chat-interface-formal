
import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { ReportTabs } from "@/components/report/ReportTabs";

const ReportPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get("prompt");

  return (
    <Layout>
      <div className="w-full min-h-[90vh] flex items-center justify-center pt-20 pb-12 relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#101622] via-gray-950/90 to-[#111119]"></div>
          <div className="absolute left-1/3 top-[10%] w-[320px] h-[320px] rounded-full bg-cyan-400/10 blur-2xl opacity-40"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl">
          <div className="glass-panel px-10 py-14 w-full shadow-2xl glass-hover">
            {prompt ? (
              <ReportTabs initialPrompt={prompt} />
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-200">
                  No cosmic coordinates provided.
                </h2>
                <p className="text-gray-400 mt-2">
                  Please return to the Nebula Navigator to chart your course.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
