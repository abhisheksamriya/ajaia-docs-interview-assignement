'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/api';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  onSuccess: () => void;
}

export default function FileUploadModal({ isOpen, onClose, currentUserId, onSuccess }: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      await uploadFile(file, currentUserId);
      setLoading(false);
      setFile(null);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('File upload failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Upload className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Import Document File</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Upload a <span className="font-semibold text-slate-200">.txt</span> or <span className="font-semibold text-slate-200">.md</span> file. The content will be automatically converted into a new editable document.
        </p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors bg-slate-950">
            <input
              type="file"
              accept=".txt,.md"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
            />
            {file && (
              <p className="mt-2 text-xs font-semibold text-emerald-400">Selected: {file.name}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || loading}
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-slate-950 rounded-xl shadow-sm hover:bg-emerald-500 disabled:opacity-50 flex items-center space-x-2 transition-colors cursor-pointer"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />}
              <span>Import Document</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}