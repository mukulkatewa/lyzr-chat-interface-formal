import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const questions = [
  {
    section: "Business Overview",
    items: [
      { 
        id: "business_type", 
        label: "What kind of business do you run, and how big is your team or company?", 
        placeholder: "e.g., We are a B2B SaaS startup in the fintech industry with 25 employees. We offer a platform for managing subscriptions and have been operating for 3 years with around $2M in annual revenue." 
      },
      { 
        id: "current_ai", 
        label: "Are you currently using any AI tools or services in your business?", 
        placeholder: "e.g., Yes, we use Intercom's chatbot for customer support (~$200/month), HubSpot's AI for email marketing (~$500/month), and we're experimenting with ChatGPT for content creation." 
      },
      { 
        id: "ai_application", 
        label: "Where in your business are you currently using AI, or thinking about using it?", 
        placeholder: "e.g., Currently using AI in customer service and marketing. We're considering AI for sales forecasting, inventory management, and HR screening processes to improve efficiency." 
      },
    ]
  },
  {
    section: "AI Usage & Value",
    items: [
      { 
        id: "ai_spend", 
        label: "Around how much do you spend on AI tools, software, or related staff every month or year?", 
        placeholder: "e.g., About $800/month on AI tool subscriptions and cloud services. We have one part-time AI consultant at $3,000/month. No dedicated full-time AI staff yet." 
      },
      { 
        id: "ai_roi", 
        label: "Are there any AI tools or solutions you're using that are clearly helping your business grow?", 
        placeholder: "e.g., Our customer support chatbot reduced response time by 60% and saved us $2,000/month in support costs. However, our AI-powered lead scoring hasn't improved conversion rates as expected." 
      },
    ]
  },
  {
    section: "Tech & Team",
    items: [
      { 
        id: "tech_stack", 
        label: "Where does your technology live — is it on the cloud, on your own servers, or a mix of both?", 
        placeholder: "e.g., Fully cloud-based on AWS. We use their EC2 instances, RDS for databases, and S3 for file storage. Everything is managed through their services with some serverless functions." 
      },
      { 
        id: "ai_team", 
        label: "Do you have any team members who work directly with AI or machine learning?", 
        placeholder: "e.g., We have one senior developer with ML experience and a data analyst familiar with AI tools. Our CTO has worked with ML in previous roles but isn't hands-on currently." 
      },
    ]
  },
  {
    section: "Data & Compliance",
    items: [
      { 
        id: "sensitive_data", 
        label: "Do you work with any sensitive information, like customer details, payment data, or health records?", 
        placeholder: "e.g., Yes, we handle customer personal information, payment data (processed through Stripe), and some business financial information. No health records or government data." 
      },
      { 
        id: "compliance", 
        label: "Are there any legal or industry rules you need to follow when it comes to handling data?", 
        placeholder: "e.g., We need to be GDPR compliant as we have European customers, and we follow PCI DSS standards for payment processing. We're also working towards SOC 2 compliance." 
      },
    ]
  }
];

const QuestionnairePage = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = Object.entries(answers)
      .map(
        ([key, value]) =>
          `Question: ${
            questions.flatMap((q) => q.items).find((i) => i.id === key)?.label
          }\nAnswer: ${value}`
      )
      .join("\n\n");
    const encodedPrompt = encodeURIComponent(prompt);
    navigate(`/report?prompt=${encodedPrompt}`);
  };

  const allQuestions = questions.flatMap((q) => q.items);
  const isFormComplete = allQuestions.every(
    (q) => answers[q.id] && answers[q.id].trim() !== ""
  );

  return (
    <Layout>
      <div className="w-full min-h-[90vh] flex items-center justify-center pt-2 pb-12 relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#101622] via-gray-900/90 to-[#111119]"></div>
          <div className="absolute left-1/3 top-[20%] w-[360px] h-[360px] rounded-full bg-cyan-400/10 blur-2xl opacity-40"></div>
          <div className="absolute right-1/4 top-[43%] w-[240px] h-[240px] rounded-full bg-purple-400/10 blur-2xl opacity-40"></div>
        </div>
        <div className="relative z-10 w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="glass-panel px-8 py-14 w-full shadow-2xl space-y-8 glass-hover"
          >
            <h1 className="apple-title mb-7">Nebula Navigator Questionnaire</h1>
            {questions.map((section) => (
              <div key={section.section}>
                <div className="text-2xl font-semibold mb-4 mt-8 text-gray-200">
                  {section.section}
                </div>
                <div className="space-y-7">
                  {section.items.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <Label
                        htmlFor={item.id}
                        className="text-base text-gray-100 font-medium"
                      >
                        {index + 1}. {item.label}
                      </Label>
                      <Textarea
                        id={item.id}
                        placeholder={item.placeholder}
                        value={answers[item.id] || ""}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value)
                        }
                        className="bg-white/10 border border-white/10 backdrop-blur rounded-lg text-base px-4 py-3 text-gray-100 placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-cyan-400/25 transition-all"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-12">
              <Button
                type="submit"
                size="lg"
                disabled={!isFormComplete}
                className="rounded-full px-12 py-5 text-lg font-semibold glass-hover bg-gradient-to-r from-cyan-400/90 to-purple-500/80 text-white shadow-lg"
              >
                Generate Cosmic Blueprint
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
