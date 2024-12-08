import React, { useState } from 'react';
import { CategoryType, Memory } from './types';
import CategorySelector from './components/CategorySelector';
import MemoryCreator from './components/MemoryCreator';
import MemoryPage from './components/MemoryPage';
import { useMemoryStore } from './store/memoryStore';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null);
  const addMemory = useMemoryStore((state) => state.addMemory);

  const handleMemoryCreated = (memoryData: Omit<Memory, 'id'>) => {
    const memory = addMemory(memoryData);
    setCurrentMemory(memory);
  };

  const handleBack = () => {
    if (currentMemory) {
      setCurrentMemory(null);
    } else {
      setSelectedCategory(null);
    }
  };

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
        ) : currentMemory ? (
          <MemoryPage memory={currentMemory} onBack={handleBack} />
        ) : (
          <MemoryCreator 
            category={selectedCategory} 
            onBack={handleBack}
            onSubmit={handleMemoryCreated}
          />
        )}
      </main>
    </div>
  );
}

export default App;