import React, { useState } from 'react';
import { CategoryType, Memory } from '../types';
import { Calendar, Image, X } from 'lucide-react';

interface MemoryCreatorProps {
  category: CategoryType;
  onBack: () => void;
  onSubmit: (memory: Omit<Memory, 'id'>) => void;
}

export default function MemoryCreator({ category, onBack, onSubmit }: MemoryCreatorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoError, setPhotoError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      startDate,
      photos,
      category,
      theme: 'default'
    });
  };

  const validateAndAddPhoto = () => {
    if (!photoUrl) {
      setPhotoError('Please enter a photo URL');
      return;
    }

    try {
      new URL(photoUrl);
      setPhotos([...photos, photoUrl]);
      setPhotoUrl('');
      setPhotoError('');
    } catch {
      setPhotoError('Please enter a valid URL');
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setPhotos(photos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
      >
        ← Back to categories
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Give your page a title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              placeholder="Write something special..."
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Photos (Optional)
              </label>
              <button
                type="button"
                onClick={() => setShowPhotoInput(!showPhotoInput)}
                className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
              >
                <Image className="w-4 h-4" />
                {showPhotoInput ? 'Hide photo input' : 'Add photos'}
              </button>
            </div>

            {showPhotoInput && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter photo URL"
                  />
                  <button
                    type="button"
                    onClick={validateAndAddPhoto}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                {photoError && (
                  <p className="text-red-500 text-sm">{photoError}</p>
                )}
              </div>
            )}

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Create Memory Page
          </button>
        </div>
      </form>
    </div>
  );
}