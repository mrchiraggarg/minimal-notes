import { Note } from '../types/Note';

export function createNewNote(): Note {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    createdAt: now,
    updatedAt: now,
  };
}

export function exportNoteAsMarkdown(note: Note) {
  const content = note.title ? `# ${note.title}\n\n${note.content}` : note.content;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title || 'untitled'}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function saveNotesToStorage(notes: Note[]) {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to localStorage:', error);
  }
}

export function loadNotesFromStorage(): Note[] {
  try {
    const stored = localStorage.getItem('notes');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load notes from localStorage:', error);
    return [];
  }
}