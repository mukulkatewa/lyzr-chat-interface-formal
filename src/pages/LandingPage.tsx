
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { Rocket, Sparkles, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center relative overflow-hidden">
          {/* Cosmic Background Effects */}
          <div className="absolute inset-0 -z-10">
            {/* Animated Stars */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(120,_119,_198,_0.1),_transparent_50%)]"></div>
              <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-300"></div>
            </div>
            
            {/* Nebula-like Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent animate-pulse delay-1000"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 space-y-8">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Rocket className="h-12 w-12 text-cyan-400 animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-purple-400 animate-spin" />
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Aetherius Labs
                </span>
              </h1>
              
              <div className="relative">
                <h2 className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                  Mapping Your Business Galaxy with AI Brilliance
                </h2>
                <Zap className="absolute -right-8 top-0 h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Harness the stellar power of AI to illuminate your business universe. 
              Our Nebula Navigator generates meticulously structured AI blueprints 
              tailored to your cosmic enterprise.
            </p>
            
            {/* CTA Button */}
            <div className="pt-8">
              <Button 
                asChild 
                size="lg" 
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-lg px-12 py-8 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <Link to="/questionnaire">
                  <div className="flex items-center space-x-3">
                    <Rocket className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span>Launch Your AI Journey</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                </Link>
              </Button>
            </div>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-500 italic">
              Initiate Nebula Navigation • Unlock Cosmic Potential
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-8 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
