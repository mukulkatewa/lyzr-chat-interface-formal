
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

const questions = [
  {
    section: "Business Overview",
    items: [
      { id: "business_type", label: "What kind of business do you run, and how big is your team or company?", placeholder: "e.g., We are a B2B SaaS startup in the fintech industry with 25 employees. We offer a platform for managing subscriptions." },
      { id: "current_ai", label: "Are you currently using any AI tools or services in your business?", placeholder: "e.g., Yes, we use a chatbot for customer support (~$50/month) and a marketing automation tool that uses AI for email campaigns (~$200/month)." },
      { id: "ai_application", label: "Where in your business are you currently using AI, or thinking about using it?", placeholder: "e.g., Currently in customer service and marketing. We are considering using AI for sales forecasting and inventory management." },
    ]
  },
  {
    section: "AI Usage & Value",
    items: [
      { id: "ai_spend", label: "Around how much do you spend on AI tools, software, or related staff every month or year?", placeholder: "e.g., About $300/month on subscriptions. We don't have dedicated AI staff yet." },
      { id: "ai_roi", label: "Are there any AI tools or solutions you’re using that are clearly helping your business grow?", placeholder: "e.g., The chatbot has reduced our support response time by 40%. The marketing tool's effectiveness is still under evaluation." },
    ]
  },
  {
    section: "Tech & Team",
    items: [
      { id: "tech_stack", label: "Where does your technology live — is it on the cloud, on your own servers, or a mix of both?", placeholder: "e.g., Fully on the cloud, primarily using AWS for our infrastructure." },
      { id: "ai_team", label: "Do you have any team members who work directly with AI or machine learning?", placeholder: "e.g., No, not at the moment. Our CTO has some experience with ML concepts but isn't a dedicated practitioner." },
    ]
  },
  {
    section: "Data & Compliance",
    items: [
      { id: "sensitive_data", label: "Do you work with any sensitive information, like customer details, payment data, or health records?", placeholder: "e.g., Yes, we handle customer PII and payment information (processed via Stripe)." },
      { id: "compliance", label: "Are there any legal or industry rules you need to follow when it comes to handling data?", placeholder: "e.g., We are GDPR compliant as we have customers in the EU." },
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">AI Blueprint Questionnaire</h1>
          <p className="text-muted-foreground mt-2">Answer these questions to generate your custom AI solution blueprint.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((section) => (
            <Card key={section.section} className="bg-card/50 border-white/10">
              <CardHeader>
                <CardTitle>{section.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="grid w-full gap-1.5">
                    <Label htmlFor={item.id} className="text-base">{item.label}</Label>
                    <Textarea
                      id={item.id}
                      placeholder={item.placeholder}
                      value={answers[item.id] || ''}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      className="min-h-[100px] text-base bg-input/70"
                      required
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" disabled={!isFormComplete}>
              <Send className="mr-2 h-5 w-5" />
              Generate Blueprint
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
