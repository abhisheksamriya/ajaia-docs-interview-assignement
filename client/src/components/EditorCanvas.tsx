'use client';

import { RefObject } from 'react';

interface EditorCanvasProps {
  content: string;
  onChange: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  isPreview: boolean;
}

export default function EditorCanvas({ content, onChange, textareaRef, isPreview }: EditorCanvasProps) {
  const renderMarkdown = (text: string) => {
    if (!text) return '<p class="text-slate-500">Start typing to see preview...</p>';
    
    let html = text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-white my-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-200 my-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-300">$1</em>')
      .replace(/<u>(.*?)<\/u>/gim, '<u class="underline text-slate-300">$1</u>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>')
      .replace(/\n/g, '<br />');

    return html;
  };

  return (
    <main className="max-w-4xl mx-auto w-full flex-1 p-6 sm:p-10">
      <div className="bg-slate-950 border border-slate-800 shadow-sm rounded-2xl min-h-175 p-8 sm:p-12">
        {isPreview ? (
          <div 
            className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed min-h-150"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start typing your document content here..."
            className="w-full h-full min-h-150 bg-transparent resize-none focus:outline-none text-slate-200 placeholder-slate-600 text-sm sm:text-base leading-relaxed font-normal"
          />
        )}
      </div>
    </main>
  );
}