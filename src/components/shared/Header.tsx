
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-white/10 bg-transparent backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Rocket className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <h1 className="text-xl font-semibold text-foreground">
              Aetherius Labs
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
