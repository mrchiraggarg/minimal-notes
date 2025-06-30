import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownPreviewProps {
  content: string;
  isDark: boolean;
}

export function MarkdownPreview({ content, isDark }: MarkdownPreviewProps) {
  return (
    <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`p-6 prose max-w-none ${
        isDark 
          ? 'prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-code:text-gray-300 prose-pre:bg-gray-800' 
          : 'prose-gray'
      }`}>
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className={`text-center py-12 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p>Your markdown preview will appear here</p>
            <p className="text-sm mt-2">Start typing in the editor to see the preview</p>
          </div>
        )}
      </div>
    </div>
  );
}