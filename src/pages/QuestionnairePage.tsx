
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';

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
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = Object.entries(answers)
      .map(([key, value]) => `Question: ${questions.flatMap(q => q.items).find(i => i.id === key)?.label}\nAnswer: ${value}`)
      .join('\n\n');
    
    const encodedPrompt = encodeURIComponent(prompt);
    navigate(`/report?prompt=${encodedPrompt}`);
  };
  
  const allQuestions = questions.flatMap(q => q.items);
  const isFormComplete = allQuestions.every(q => answers[q.id] && answers[q.id].trim() !== '');

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-400 animate-spin" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Nebula Navigator Questionnaire
            </h1>
            <Sparkles className="h-8 w-8 text-cyan-400 animate-spin" />
          </div>
          
          <p className="text-gray-400 text-lg">
            Chart your course through the cosmos of AI possibilities
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((section) => (
            <Card key={section.section} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-400 flex items-center space-x-2">
                  <span>{section.section}</span>
                  <div className="h-px bg-gradient-to-r from-cyan-400 to-transparent flex-1 ml-4"></div>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {section.section === "Business Overview" && "Tell us about your cosmic enterprise"}
                  {section.section === "AI Usage & Value" && "Your current AI constellation"}
                  {section.section === "Tech & Team" && "Your technological infrastructure"}
                  {section.section === "Data & Compliance" && "Your data governance galaxy"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.items.map((item, index) => (
                  <div key={item.id} className="grid w-full gap-3">
                    <Label htmlFor={item.id} className="text-base text-gray-200 font-medium">
                      {index + 1}. {item.label}
                    </Label>
                    <Textarea
                      id={item.id}
                      placeholder={item.placeholder}
                      value={answers[item.id] || ''}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      className="min-h-[120px] text-base bg-slate-800/50 border-slate-600/50 text-gray-100 placeholder:text-gray-500 focus:border-cyan-400/50 focus:ring-cyan-400/25 transition-all duration-300"
                      required
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          
          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button 
              type="submit" 
              size="lg" 
              disabled={!isFormComplete}
              className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-lg px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <div className="flex items-center space-x-3">
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span>Generate Cosmic Blueprint</span>
              </div>
              {isFormComplete && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
