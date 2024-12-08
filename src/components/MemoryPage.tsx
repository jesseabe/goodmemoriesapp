import React from 'react';
import { Memory } from '../types';
import { formatDate } from '../utils/helpers';
import { Calendar } from 'lucide-react';
import Timer from './Timer';

interface MemoryPageProps {
  memory: Memory;
  onBack: () => void;
}

export default function MemoryPage({ memory, onBack }: MemoryPageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
      >
        ← Back to create new memory
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{memory.title}</h1>
          
          <div className="flex items-center gap-2 mb-6 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>Started on {formatDate(memory.startDate)}</span>
          </div>

          <div className="mb-8">
            <Timer startDate={memory.startDate} />
          </div>

          <p className="text-gray-700 mb-8 whitespace-pre-wrap">{memory.description}</p>

          {memory.photos.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memory.photos.map((photo, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9">
                    <img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}