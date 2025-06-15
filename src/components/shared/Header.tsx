
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Rocket className="h-7 w-7 text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Aetherius Labs
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
