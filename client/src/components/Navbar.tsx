'use client';

import { FileText, User } from 'lucide-react';

interface NavbarProps {
  currentUserId: string;
  onUserChange: (userId: string) => void;
}

export default function Navbar({ currentUserId, onUserChange }: NavbarProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 font-black shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider uppercase text-white">Ajaia Docs</h1>
            <p className="text-[10px] text-slate-400 font-medium">Workspace v2.4</p>
          </div>
        </div>

        {/* User Switcher for Testing Sharing */}
        <div className="flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <div className="hidden sm:flex items-center space-x-1 px-2 text-slate-400 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Active:</span>
          </div>
          <select
            value={currentUserId}
            onChange={(e) => onUserChange(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="user_1">Alice (user_1)</option>
            <option value="user_2">Bob (user_2)</option>
          </select>
        </div>

      </div>
    </header>
  );
}