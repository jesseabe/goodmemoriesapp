import React from 'react';
import { Heart, Dog, Users } from 'lucide-react';
import { CategoryType } from '../types';

interface CategorySelectorProps {
  onSelect: (category: CategoryType) => void;
}

export default function CategorySelector({ onSelect }: CategorySelectorProps) {
  const categories = [
    {
      id: 'relationship' as CategoryType,
      title: 'Relationship',
      description: 'Create a special page for your loved one',
      Icon: Heart,
    },
    {
      id: 'pet' as CategoryType,
      title: 'Pet',
      description: 'Cherish memories with your furry friend',
      Icon: Dog,
    },
    {
      id: 'group' as CategoryType,
      title: 'Group',
      description: 'Share memories with friends or colleagues',
      Icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-6">
      {categories.map(({ id, title, description, Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <Icon className="w-16 h-16 mb-4 text-indigo-600" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-center">{description}</p>
        </button>
      ))}
    </div>
  );
}