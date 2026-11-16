'use client';

import { Bold, Italic, Underline, Heading1, List } from 'lucide-react';

interface EditorToolbarProps {
  onFormat: (prefix: string, suffix?: string) => void;
}

export default function EditorToolbar({ onFormat }: EditorToolbarProps) {
  return (
    <div className="bg-slate-950 border-b border-slate-800 px-6 py-2 flex items-center space-x-1 shadow-sm overflow-x-auto text-slate-300">
      <button
        onClick={() => onFormat('**', '**')}
        title="Bold"
        className="p-2 hover:bg-slate-800 hover:text-white rounded-lg font-bold transition-colors cursor-pointer"
        type="button"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => onFormat('*', '*')}
        title="Italic"
        className="p-2 hover:bg-slate-800 hover:text-white rounded-lg italic transition-colors cursor-pointer"
        type="button"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => onFormat('<u>', '</u>')}
        title="Underline"
        className="p-2 hover:bg-slate-800 hover:text-white rounded-lg underline transition-colors cursor-pointer"
        type="button"
      >
        <Underline className="w-4 h-4" />
      </button>
      <div className="h-4 w-px bg-slate-800 mx-2" />
      <button
        onClick={() => onFormat('# ')}
        title="Heading"
        className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer"
        type="button"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => onFormat('- ')}
        title="Bullet List"
        className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer"
        type="button"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}