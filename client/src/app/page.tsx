'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchDocuments, createDocument, deleteDocument, DocumentItem } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FileUploadModal from '@/components/FileUploadModal';
import { Plus, Upload, FileText, Trash2, Clock, Share2, Search } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState('user_1');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'owned' | 'shared'>('owned');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');

  const loadDocs = async (userId: string) => {
    try {
      setLoading(true);
      const data = await fetchDocuments(userId);
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs(currentUserId);
  }, [currentUserId]);

  const handleCreateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const doc = await createDocument(newDocTitle || 'Untitled Document', currentUserId);
      setNewDocTitle('');
      router.push(`/editor/${doc._id}`);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        loadDocs(currentUserId);
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const ownedDocs = documents.filter((d) => d.ownerId === currentUserId);
  const sharedDocs = documents.filter((d) => d.ownerId !== currentUserId);
  
  const tabFilteredDocs = activeTab === 'owned' ? ownedDocs : sharedDocs;
  const displayedDocs = tabFilteredDocs.filter((d) => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar currentUserId={currentUserId} onUserChange={setCurrentUserId} />

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ownedCount={ownedDocs.length}
          sharedCount={sharedDocs.length}
        />

        <main className="flex-1 px-4 sm:px-8 py-8 bg-slate-900/50">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {activeTab === 'owned' ? 'Owned Documents' : 'Shared With Me'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage and collaborate on your workspace documents.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm w-48 sm:w-60"
                />
              </div>

              <button
                onClick={() => setIsUploadOpen(true)}
                className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer shadow-sm"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Import</span>
              </button>

              <form onSubmit={handleCreateNew} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Title..."
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs px-3 py-2.5 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm w-32 sm:w-40"
                />
                <button
                  type="submit"
                  className="inline-flex items-center space-x-1.5 bg-emerald-600 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New</span>
                </button>
              </form>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-xs font-semibold text-slate-500">Loading documents...</div>
          ) : displayedDocs.length === 0 ? (
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
              No matching documents found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedDocs.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => router.push(`/editor/${doc._id}`)}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      {activeTab === 'owned' && (
                        <button
                          onClick={(e) => handleDelete(doc._id, e)}
                          className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {doc.content || 'Empty document...'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      doc.ownerId === currentUserId ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' : 'bg-amber-950 text-amber-400 border border-amber-900/50'
                    }`}>
                      {doc.ownerId === currentUserId ? 'Owner' : 'Shared'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <FileUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentUserId={currentUserId}
        onSuccess={() => loadDocs(currentUserId)}
      />
    </div>
  );
}