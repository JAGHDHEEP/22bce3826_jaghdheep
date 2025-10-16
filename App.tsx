
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { CodeDisplay } from './components/CodeDisplay';
import { ReviewReport } from './components/ReviewReport';
import { Loader } from './components/Loader';
import { reviewCode } from './services/geminiService';
import { CodeIcon } from './components/icons';

const App: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [reviewReport, setReviewReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setFileContent(text);
      setFileName(file.name);
      setReviewReport(null);
      setError(null);
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setFileContent(null);
        setFileName(null);
    }
    reader.readAsText(file);
  }, []);

  const handleReviewClick = async () => {
    if (!fileContent) return;

    setIsLoading(true);
    setError(null);
    setReviewReport(null);

    try {
      const report = await reviewCode(fileContent);
      setReviewReport(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    setFileContent(null);
    setFileName(null);
    setReviewReport(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-400 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel */}
        <div className="flex flex-col gap-6 h-full">
          {!fileContent && <FileUpload onFileSelect={handleFileSelect} />}
          {fileContent && fileName && (
            <>
                <CodeDisplay fileName={fileName} code={fileContent} onClear={clearFile} />
                <button
                onClick={handleReviewClick}
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
                >
                {isLoading ? (
                    <>
                    <Loader />
                    Analyzing...
                    </>
                ) : (
                    <>
                    <CodeIcon />
                    Review Code
                    </>
                )}
                </button>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className="bg-gray-800 rounded-lg shadow-lg h-full min-h-[400px] lg:min-h-0 lg:h-auto lg:max-h-[calc(100vh-200px)] overflow-y-auto p-6 border border-gray-700">
          {isLoading && (
             <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader />
                <p className="text-lg font-medium text-gray-400">AI is analyzing your code...</p>
                <p className="text-sm text-gray-500">This may take a few moments.</p>
             </div>
          )}
          {!isLoading && error && (
            <div className="flex items-center justify-center h-full text-center text-red-400">
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                    <p className="font-semibold">An Error Occurred</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
          )}
           {!isLoading && !error && reviewReport && (
            <ReviewReport report={reviewReport} />
          )}
          {!isLoading && !error && !reviewReport && (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <CodeIcon className="w-16 h-16 mb-4"/>
                <h3 className="text-xl font-semibold text-gray-300">Code Review Report</h3>
                <p className="mt-2">Upload a code file to begin the review process.</p>
                <p>The AI assistant will provide improvement suggestions here.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
