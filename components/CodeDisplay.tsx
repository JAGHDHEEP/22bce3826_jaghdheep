
import React from 'react';
import { FileIcon, CloseIcon } from './icons';

interface CodeDisplayProps {
  fileName: string;
  code: string;
  onClear: () => void;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ fileName, code, onClear }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg w-full border border-gray-700">
        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-t-lg border-b border-gray-700">
            <div className="flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-white">{fileName}</span>
            </div>
            <button onClick={onClear} className="text-gray-500 hover:text-white transition-colors">
                <CloseIcon className="w-5 h-5"/>
            </button>
        </div>
        <pre className="p-4 text-sm text-gray-300 overflow-auto max-h-[calc(100vh-300px)]">
            <code className="font-mono">{code}</code>
        </pre>
    </div>
  );
};
