import React from 'react';
import { Search, Plus, FileText, Calendar } from 'lucide-react';
import { Note } from '../types/Note';

interface NoteSidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNoteSelect: (noteId: string) => void;
  onNewNote: () => void;
  isDark: boolean;
}

export function NoteSidebar({
  notes,
  activeNoteId,
  searchTerm,
  onSearchChange,
  onNoteSelect,
  onNewNote,
  isDark,
}: NoteSidebarProps) {
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`w-80 h-full border-r ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} flex flex-col`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Notes
          </h1>
          <button
            onClick={onNewNote}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title="New Note (Ctrl+N)"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className={`p-4 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <FileText size={48} className="mx-auto mb-2 opacity-50" />
            <p>No notes found</p>
            <p className="text-sm mt-1">Create your first note to get started</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => onNoteSelect(note.id)}
                className={`w-full p-3 mb-2 rounded-lg text-left transition-all ${
                  activeNoteId === note.id
                    ? isDark
                      ? 'bg-blue-900 bg-opacity-50 border-blue-500'
                      : 'bg-blue-50 border-blue-200'
                    : isDark
                      ? 'hover:bg-gray-800 border-transparent'
                      : 'hover:bg-gray-50 border-transparent'
                } border`}
              >
                <h3 className={`font-medium mb-1 truncate ${
                  activeNoteId === note.id
                    ? isDark ? 'text-blue-300' : 'text-blue-700'
                    : isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {note.title || 'Untitled'}
                </h3>
                <p className={`text-sm mb-2 line-clamp-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {note.content.slice(0, 80) || 'No content'}
                </p>
                <div className={`flex items-center text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <Calendar size={12} className="mr-1" />
                  {formatDate(note.updatedAt)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}