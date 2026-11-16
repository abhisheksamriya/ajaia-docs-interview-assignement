'use client';

import { ShieldCheck, Share2, FolderOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: 'owned' | 'shared';
  setActiveTab: (tab: 'owned' | 'shared') => void;
  ownedCount: number;
  sharedCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, ownedCount, sharedCount }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 p-6 hidden md:flex flex-col space-y-6 text-slate-300">
      <div className="flex items-center space-x-2 text-slate-400 text-[11px] font-bold tracking-widest uppercase px-3">
        <FolderOpen className="w-4 h-4 text-emerald-500" />
        <span>Navigation</span>
      </div>

      <nav className="space-y-1.5">
        <button
          onClick={() => setActiveTab('owned')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'owned'
              ? 'bg-slate-800/90 text-white border border-slate-700/60 shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'owned' ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Owned Documents</span>
          </div>
          <span className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 text-[10px] text-slate-400">
            {ownedCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('shared')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'shared'
              ? 'bg-slate-800/90 text-white border border-slate-700/60 shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Share2 className={`w-4 h-4 ${activeTab === 'shared' ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>Shared With Me</span>
          </div>
          <span className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 text-[10px] text-slate-400">
            {sharedCount}
          </span>
        </button>
      </nav>
    </aside>
  );
}