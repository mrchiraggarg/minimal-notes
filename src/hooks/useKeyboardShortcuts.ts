import { useEffect } from 'react';

interface KeyboardShortcuts {
  onSave?: () => void;
  onNewNote?: () => void;
  onTogglePreview?: () => void;
  onToggleTheme?: () => void;
}

export function useKeyboardShortcuts({
  onSave,
  onNewNote,
  onTogglePreview,
  onToggleTheme,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            onSave?.();
            break;
          case 'n':
            event.preventDefault();
            onNewNote?.();
            break;
          case 'e':
            event.preventDefault();
            onTogglePreview?.();
            break;
          case 'd':
            event.preventDefault();
            onToggleTheme?.();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onNewNote, onTogglePreview, onToggleTheme]);
}