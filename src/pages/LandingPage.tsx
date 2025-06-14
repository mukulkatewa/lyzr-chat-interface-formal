
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';
import { Rocket } from 'lucide-react';

const LandingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center relative overflow-hidden">
          {/* Background visuals */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/50 via-transparent to-transparent"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Aetherius Labs
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Mapping Your Business Galaxy with AI Brilliance
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
              <Link to="/questionnaire">
                <Rocket className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                Launch Your AI Journey
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
