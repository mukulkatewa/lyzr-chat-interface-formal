
import React from "react";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export function Header() {
  return (
    <header className="glass-blur-bar fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Rocket className="h-7 w-7 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-gray-100 to-purple-400 bg-clip-text text-transparent tracking-tighter">
            Aetherius Labs
          </span>
        </Link>
      </div>
    </header>
  );
}
