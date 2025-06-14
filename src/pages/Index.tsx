
import { ChatInterface } from '@/components/chat/ChatInterface';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">
              Business Report AI Assistant
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full max-w-4xl py-6">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-card shadow-lg border">
                <ChatInterface />
            </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
