
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { Rocket } from "lucide-react";

const LandingPage = () => {
  return (
    <Layout>
      <div className="w-full min-h-[90vh] flex items-center justify-center pt-16 pb-12 relative overflow-hidden">
        {/* Subtle parallax galaxies/gradients background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#19263B]/90 to-[#18152B]"></div>
          <div className="absolute left-1/3 top-1/4 w-[360px] h-[360px] rounded-full bg-cyan-400/10 blur-2xl opacity-80"></div>
          <div className="absolute right-1/4 top-[64%] w-[240px] h-[240px] rounded-full bg-purple-400/15 blur-2xl opacity-80"></div>
          <div className="absolute left-1/4 top-[70%] w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl opacity-60"></div>
        </div>
        <section className="relative z-10 w-full max-w-2xl flex flex-col gap-10 items-center px-4">
          <div className="glass-panel px-10 py-16 w-full text-center space-y-8 shadow-2xl glass-hover">
            <Rocket className="mx-auto w-14 h-14 text-cyan-300 mb-6 animate-bounce-slow" />
            <h1 className="apple-title">Aetherius Labs</h1>
            <div className="apple-subtitle">
              Mapping Your Business Galaxy with AI Brilliance
            </div>
            <p className="text-lg text-gray-300 mt-2 mb-2 max-w-[90%] mx-auto font-light">
              Greetings, cosmic voyager! Welcome to Aetherius Labs, where we harness
              the stellar power of AI to illuminate your business universe.<br />
              Launch your Nebula Navigator <span className="font-semibold">AI Blueprint</span> journey below.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-14 py-5 mt-5 text-lg font-semibold glass-hover bg-gradient-to-r from-cyan-400/80 to-purple-500/80 text-white shadow-lg"
            >
              <Link to="/questionnaire">
                Initiate Nebula Navigation
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LandingPage;
