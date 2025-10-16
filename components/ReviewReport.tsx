
import React from 'react';
import { CheckCircleIcon } from './icons';

interface ReviewReportProps {
  report: string;
}

export const ReviewReport: React.FC<ReviewReportProps> = ({ report }) => {
  return (
    <div>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-white">Review Complete</h2>
        </div>
        <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-pre:bg-gray-900/50 prose-pre:rounded-md prose-pre:border prose-pre:border-gray-600 prose-headings:text-white prose-a:text-indigo-400 prose-strong:text-gray-200">
            {/* Using a div to render markdown-like text from Gemini. The `prose` classes will style it nicely. */}
            {/* A proper markdown parser would be better, but this avoids extra dependencies. */}
            <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }}/>
        </div>
    </div>
  );
};
