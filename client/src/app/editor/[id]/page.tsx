'use client';

import { useEffect, useState, use, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { getDocumentById, updateDocument, shareDocument, DocumentItem } from '@/lib/api';
import EditorToolbar from '@/components/EditorToolbar';
import EditorCanvas from '@/components/EditorCanvas';
import { ArrowLeft, Share2, Check, Loader2, Eye, Edit3, Download } from 'lucide-react';

function EditorContent({ docId }: { docId: string }) {
  const router = useRouter();

  const [doc, setDoc] = useState<DocumentItem | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [shareTarget, setShareTarget] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getDocumentById(docId)
      .then((resDoc) => {
        setDoc(resDoc);
        setTitle(resDoc.title);
        setContent(resDoc.content || '');
      })
      .catch((err) => console.error('Error loading doc:', err));
  }, [docId]);

  // auto save
  useEffect(() => {
    if (!doc) return;
    const timer = setTimeout(async () => {
      try {
        setSaving(true);
        await updateDocument(docId, title, content);
        setSaving(false);
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Auto-save error:', error);
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, docId, doc]);

  const wordsCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charsCount = content.length;

  const handleExport = (format: 'txt' | 'md' | 'pdf') => {
    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${title || 'Document'}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
                h1 { font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
              </style>
            </head>
            <body>
              <h1>${title || 'Untitled Document'}</h1>
              <div>${content.replace(/\n/g, '<br/>')}</div>
              <script>window.onload = function() { window.print(); };</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
      return;
    }

    const element = window.document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title || 'document'}.${format}`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const handleFormat = (prefix: string, suffix = '') => {
    if (isPreview) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const replacement = prefix + (selectedText || 'text') + suffix;
    const newContent = content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareTarget) return;
    try {
      await shareDocument(docId, shareTarget);
      alert(`Document successfully shared with ${shareTarget}!`);
      setShareTarget('');
      setShowShareModal(false);
    } catch (error) {
      console.error('Sharing error:', error);
    }
  };

  if (!doc) {
    return <div className="text-center py-20 text-xs font-semibold text-slate-500 bg-slate-900 min-h-screen">Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* top bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base font-bold text-white bg-transparent hover:bg-slate-900 focus:bg-slate-900 px-2 py-1 rounded-lg border border-transparent focus:border-slate-700 focus:outline-none transition-all w-52 sm:w-80"
          />
        </div>

        {/* Word Count */}
        <div className="hidden lg:flex items-center space-x-4 text-xs font-medium text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <span>{wordsCount} words</span>
          <span>•</span>
          <span>{charsCount} chars</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex text-xs text-slate-400 font-medium items-center space-x-1.5">
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved</span>
              </>
            ) : null}
          </div>

          {/* export dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center space-x-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700/60"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-slate-950 border border-slate-800 rounded-xl shadow-xl py-1 hidden group-hover:block z-45">
              <button
                onClick={() => handleExport('txt')}
                className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-900 font-medium cursor-pointer"
              >
                Download .txt
              </button>
              <button
                onClick={() => handleExport('md')}
                className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-900 font-medium cursor-pointer"
              >
                Download .md
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="w-full text-left px-4 py-2 text-xs text-emerald-400 hover:bg-slate-900 font-bold border-t border-slate-900 cursor-pointer"
              >
                Save as .pdf
              </button>
            </div>
          </div>

          {/* edit / preview */}
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="inline-flex items-center space-x-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700/60"
          >
            {isPreview ? <Edit3 className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isPreview ? 'Edit' : 'Preview'}</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer hover:bg-emerald-500 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {!isPreview && <EditorToolbar onFormat={handleFormat} />}

      <EditorCanvas
        content={content}
        onChange={setContent}
        textareaRef={textareaRef}
        isPreview={isPreview}
      />

      {showShareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Share Document</h3>
            <p className="text-xs text-slate-400 mb-4">
              Grant access to another user (e.g., <span className="font-semibold text-slate-200">user_2</span>).
            </p>

            <form onSubmit={handleShare} className="space-y-4">
              <input
                type="text"
                placeholder="Enter User ID (e.g. user_2)"
                value={shareTarget}
                onChange={(e) => setShareTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs px-4 py-3 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-600"
              />

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-slate-950 rounded-xl shadow-sm hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EditorWrapper({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <EditorContent docId={resolvedParams.id} />;
}

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-slate-500 bg-slate-950 min-h-screen">Loading editor...</div>}>
      <EditorWrapper params={params} />
    </Suspense>
  );
}