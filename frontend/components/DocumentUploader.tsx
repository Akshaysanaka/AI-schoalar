
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { FileUpIcon } from './ui/icons';
import { summarizeDocument } from '../services/geminiService';

const DocumentUploader: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      // In a real app, you'd process the file. Here we just set the name.
      // To simulate, we'll clear the textarea for the user to paste content.
      setDocumentText('');
      setSummary('');
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;
    setIsLoading(true);
    setSummary('');
    try {
        const response = await summarizeDocument(documentText);
        setSummary(response.text);
    } catch (error) {
        console.error("Error summarizing document:", error);
        setSummary("An error occurred while analyzing the document.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Document Center</h1>
        <p className="text-muted-foreground">Upload and analyze your financial aid documents with AI.</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Analyze</CardTitle>
            <CardDescription>
                Upload a document, then paste its content to get an AI-generated eligibility summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer border-gray-300 hover:border-gray-400 focus:outline-none">
                    <FileUpIcon className="w-8 h-8 text-gray-400"/>
                    <span className="mt-2 text-base leading-normal text-gray-500">
                        {fileName ? fileName : 'Select a file'}
                    </span>
                    <input id="file-upload" name="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
            <div>
              <label htmlFor="doc-text" className="block text-sm font-medium text-gray-700">Paste Document Text</label>
              <textarea
                id="doc-text"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste the content of your scholarship description, financial aid offer, or eligibility requirements here..."
                className="w-full p-2 mt-1 border rounded-md min-h-[200px]"
                disabled={!fileName}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!documentText || isLoading}
              className="w-full px-4 py-2 font-bold text-white rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary/90"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Document'}
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility Summary</CardTitle>
            <CardDescription>AI-powered insights from your document.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-primary"></div>
                </div>
            ) : summary ? (
              <div className="p-4 space-y-2 prose-sm bg-gray-100 rounded-md max-w-none">
                <pre className="p-0 m-0 font-sans whitespace-pre-wrap bg-transparent">{summary}</pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <FileUpIcon className="w-12 h-12 mb-4"/>
                <p>Your summary will appear here after analysis.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUploader;
