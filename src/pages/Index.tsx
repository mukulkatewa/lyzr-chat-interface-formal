
import { ReportGenerator } from '@/components/report/ReportGenerator';
import { ModeToggle } from '@/components/ModeToggle';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="border-b bg-card/75 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">
              AI Report Generator
            </h1>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto h-full max-w-4xl py-8">
            <ReportGenerator />
        </div>
      </main>
    </div>
  );
};

export default Index;
