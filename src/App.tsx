import React, { useState } from 'react';
import { CategoryType } from './types';
import CategorySelector from './components/CategorySelector';
import MemoryCreator from './components/MemoryCreator';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold text-gray-900">Memory Pages</h1>
          <p className="text-gray-600 mt-1">Create beautiful memory pages for your special moments</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What kind of memory page would you like to create?
              </h2>
              <p className="text-gray-600">
                Choose a category below to get started with your personalized memory page
              </p>
            </div>
            <CategorySelector onSelect={setSelectedCategory} />
          </>
        ) : (
          <MemoryCreator 
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;