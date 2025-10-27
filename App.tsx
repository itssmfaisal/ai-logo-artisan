
import React, { useState } from 'react';
import Header from './components/Header';
import LogoGeneratorForm from './components/LogoGeneratorForm';
import LogoDisplay from './components/LogoDisplay';
import { generateLogo } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateLogo(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <p className="text-center max-w-3xl mx-auto text-lg text-gray-300 mb-8">
          Welcome to the future of logo design. Describe the logo you envision, and our AI will craft it for you in seconds. Be as descriptive as you like for the best results.
        </p>
        <LogoGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <LogoDisplay
          image={generatedImage}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
