import React, { useState, useEffect, useCallback } from 'react';
import { NoteSidebar } from './components/NoteSidebar';
import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Toolbar } from './components/Toolbar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Note } from './types/Note';
import { createNewNote, exportNoteAsMarkdown, saveNotesToStorage, loadNotesFromStorage } from './utils/noteUtils';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useLocalStorage('theme', false);
  const [showPreview, setShowPreview] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowPreview(false);
      } else {
        setShowPreview(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with a welcome note if no notes exist
  useEffect(() => {
    if (notes.length === 0) {
      const welcomeNote: Note = {
        id: crypto.randomUUID(),
        title: 'Welcome to Notes',
        content: `# Welcome to Your Markdown Notes App! 🎉

This is a beautiful, minimal notes app that supports **Markdown** syntax.

## Features

- ✨ **Live Preview**: See your markdown rendered in real-time
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 💾 **Auto-save**: Your notes are automatically saved to localStorage
- 📱 **Responsive**: Works perfectly on desktop and mobile
- ⌨️ **Keyboard Shortcuts**: Use Ctrl+S to save, Ctrl+N for new note, Ctrl+E to toggle preview
- 📁 **Export**: Download your notes as .md files

## Markdown Support

You can use all standard markdown features:

### Text Formatting
- **Bold text**
- *Italic text*
- ~~Strikethrough~~
- \`Inline code\`

### Lists
1. Numbered lists
2. Work great
   - Nested lists
   - Are supported too

### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and Images
[Links work great](https://example.com)

---

Start writing your first note by creating a new one with the + button or Ctrl+N!`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      setNotes([welcomeNote]);
      setActiveNoteId(welcomeNote.id);
    } else if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId, setNotes]);

  const activeNote = notes.find(note => note.id === activeNoteId);

  const handleNewNote = useCallback(() => {
    const newNote = createNewNote();
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setSearchTerm('');
  }, [setNotes]);

  const handleNoteSelect = useCallback((noteId: string) => {
    setActiveNoteId(noteId);
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    if (!activeNoteId) return;
    
    setNotes(prev => prev.map(note =>
      note.id === activeNoteId
        ? { ...note, title, updatedAt: Date.now() }
        : note
    ));
  }, [activeNoteId, setNotes]);

  const handleContentChange = useCallback((content: string) => {
    if (!activeNoteId) return;
    
    setNotes(prev => prev.map(note =>
      note.id === activeNoteId
        ? { ...note, content, updatedAt: Date.now() }
        : note
    ));
  }, [activeNoteId, setNotes]);

  const handleSave = useCallback(() => {
    // Auto-save is already handled, but we can show a brief feedback
    console.log('Notes saved!');
  }, []);

  const handleExport = useCallback(() => {
    if (activeNote) {
      exportNoteAsMarkdown(activeNote);
    }
  }, [activeNote]);

  const handleToggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, [setIsDark]);

  const handleTogglePreview = useCallback(() => {
    setShowPreview(prev => !prev);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: handleSave,
    onNewNote: handleNewNote,
    onTogglePreview: handleTogglePreview,
    onToggleTheme: handleToggleTheme,
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-stone-50 text-gray-900'
    }`}>
      <div className="h-screen flex flex-col">
        <Toolbar
          isDark={isDark}
          showPreview={showPreview}
          onToggleTheme={handleToggleTheme}
          onTogglePreview={handleTogglePreview}
          onExport={handleExport}
          onSave={handleSave}
          isMobile={isMobile}
        />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Hidden on mobile when preview is shown */}
          <div className={`${isMobile && showPreview ? 'hidden' : 'block'}`}>
            <NoteSidebar
              notes={notes}
              activeNoteId={activeNoteId}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onNoteSelect={handleNoteSelect}
              onNewNote={handleNewNote}
              isDark={isDark}
            />
          </div>

          {/* Editor - Hidden on mobile when preview is shown */}
          <div className={`${isMobile && showPreview ? 'hidden' : 'flex flex-1'}`}>
            {activeNote ? (
              <MarkdownEditor
                title={activeNote.title}
                content={activeNote.content}
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
                isDark={isDark}
              />
            ) : (
              <div className={`flex-1 flex items-center justify-center ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <p>Select a note to start editing</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview - Always visible on desktop, toggleable on mobile */}
          {(!isMobile || showPreview) && (
            <div className={`${isMobile ? 'flex-1' : 'w-1/2'} border-l ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <MarkdownPreview
                content={activeNote?.content || ''}
                isDark={isDark}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;