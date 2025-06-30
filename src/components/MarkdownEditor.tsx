import React from 'react';

interface MarkdownEditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  isDark: boolean;
}

export function MarkdownEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  isDark,
}: MarkdownEditorProps) {
  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Title Input */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} p-4`}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={`w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-opacity-50 ${
            isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Content Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Start writing your note in markdown..."
          className={`w-full h-full resize-none bg-transparent border-none outline-none font-mono text-sm leading-relaxed placeholder-opacity-50 ${
            isDark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'
          }`}
          spellCheck={false}
        />
      </div>
    </div>
  );
}