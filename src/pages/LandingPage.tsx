
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { Rocket, Lightbulb, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
    title: "AI Blueprints",
    desc: "Generate custom AI adoption roadmaps tailored to your business in seconds."
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    title: "Effortless Analysis",
    desc: "Go from idea to actionable SWOT using modern AI without the jargon or guesswork."
  },
  {
    icon: <Users className="w-8 h-8 text-amber-400" />,
    title: "Human Insights",
    desc: "Blend powerful AI with real-world guidance—no prior expertise needed."
  }
];

const steps = [
  {
    step: "1",
    title: "Fill out your unique business profile",
    desc: "Answer a simple, jargon-free questionnaire about your team, tech, and goals."
  },
  {
    step: "2",
    title: "Launch your AI Navigator",
    desc: "Instantly receive a professional AI Blueprint customized for your business needs."
  },
  {
    step: "3",
    title: "Review, Save, Share",
    desc: "Get a beautifully formatted SWOT & recommendations—share or save anytime."
  }
];

const LandingPage = () => {
  return (
    <Layout>
      {/* Main Glassy Hero */}
      <div className="w-full min-h-[95vh] flex flex-col items-center pt-20 pb-0 relative overflow-x-clip bg-gradient-to-br from-cyan-50/70 via-white/90 to-purple-50/40">
        {/* Subtle parallax backgrounds for light */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/70 to-purple-50/40"></div>
          <div className="absolute left-1/3 top-1/4 w-[360px] h-[360px] rounded-full bg-cyan-300/40 blur-2xl opacity-70"></div>
          <div className="absolute right-1/4 top-[64%] w-[240px] h-[240px] rounded-full bg-purple-300/30 blur-2xl opacity-70"></div>
          <div className="absolute left-[12vw] bottom-[12vh] w-[120px] h-[120px] rounded-full bg-amber-300/20 blur-2xl opacity-60"></div>
        </div>

        {/* Hero card */}
        <section className="relative z-10 w-full max-w-3xl flex flex-col gap-8 items-center px-4">
          <div className="glass-panel px-10 py-16 w-full text-center space-y-8 shadow-2xl glass-hover">
            <Rocket className="mx-auto w-16 h-16 text-cyan-400 mb-5 animate-bounce-slow drop-shadow-lg" />
            <h1 className="apple-title">Aetherius Labs</h1>
            <div className="apple-subtitle">
              Mapping Your Business Galaxy with AI Brilliance
            </div>
            <p className="text-lg text-gray-600 mt-2 mb-2 max-w-[85%] mx-auto font-light">
              Harness cutting-edge AI to uncover hidden strengths, seize new growth, and future-proof your business. <br />
              Begin your AI Blueprint journey—just like seasoned innovators do.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-14 py-5 mt-4 text-lg font-semibold glass-hover bg-gradient-to-r from-cyan-500/90 to-purple-500/80 text-white shadow-lg"
            >
              <Link to="/questionnaire">
                Initiate Nebula Navigation
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-14 mb-10 px-4 grid md:grid-cols-3 gap-7">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="glass-panel flex flex-col items-center space-y-4 py-9 px-6 shadow-lg border-t-2 border-cyan-200/60 hover:scale-[1.025] transition-all"
          >
            {feature.icon}
            <div className="font-semibold text-lg text-gray-700">{feature.title}</div>
            <div className="text-sm text-gray-500">{feature.desc}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="relative z-10 w-full max-w-4xl mx-auto mb-14 px-4">
        <div className="glass-panel p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-7 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 bg-clip-text text-transparent">
            How does it work?
          </h2>
          <div className="grid md:grid-cols-3 gap-7">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4">
                <div className="text-4xl font-black text-cyan-400 drop-shadow">{step.step}</div>
                <div className="font-semibold text-gray-700 text-lg">{step.title}</div>
                <div className="text-gray-500 text-base">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative z-10 w-full max-w-3xl mx-auto mb-20 px-4">
        <div className="glass-panel p-10 shadow-xl flex flex-col items-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 via-purple-500 to-cyan-600 bg-clip-text text-transparent">
            Why Choose Aetherius Labs?
          </div>
          <ul className="list-none space-y-2 text-gray-700 text-center max-w-2xl text-lg">
            <li>✓ World-class AI insights designed for every business, not just tech giants.</li>
            <li>✓ Crystal-clear reporting with ultra-modern, shareable designs.</li>
            <li>✓ Friendly guidance—no AI jargon, just transparent value.</li>
            <li>✓ Free to try, pay only when you want to export or unlock advanced guidance.</li>
          </ul>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full flex justify-center py-8 bg-gradient-to-t from-white/90 to-transparent z-20 relative">
        <div className="text-gray-400 text-center text-sm">
          &copy; {new Date().getFullYear()} Aetherius Labs. All rights reserved. Not affiliated with Apple Inc.
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;

