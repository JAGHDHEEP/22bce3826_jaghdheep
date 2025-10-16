
import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
             <BotIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-xl font-bold text-white">
              Code Review Assistant
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
