import React from 'react';
import { Moon, Sun, Download, Eye, EyeOff, Save } from 'lucide-react';

interface ToolbarProps {
  isDark: boolean;
  showPreview: boolean;
  onToggleTheme: () => void;
  onTogglePreview: () => void;
  onExport: () => void;
  onSave: () => void;
  isMobile: boolean;
}

export function Toolbar({
  isDark,
  showPreview,
  onToggleTheme,
  onTogglePreview,
  onExport,
  onSave,
  isMobile,
}: ToolbarProps) {
  return (
    <div className={`flex items-center justify-between p-3 border-b ${
      isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-center space-x-2">
        {isMobile && (
          <button
            onClick={onTogglePreview}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title={`${showPreview ? 'Hide' : 'Show'} Preview (Ctrl+E)`}
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onSave}
          className={`p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title="Save (Ctrl+S)"
        >
          <Save size={18} />
        </button>
        
        <button
          onClick={onExport}
          className={`p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title="Export as Markdown"
        >
          <Download size={18} />
        </button>
        
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title="Toggle Theme (Ctrl+D)"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}