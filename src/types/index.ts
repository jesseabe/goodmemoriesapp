export type CategoryType = 'relationship' | 'pet' | 'group';

export interface Memory {
  id: string;
  title: string;
  description: string;
  startDate: string;
  photos: string[];
  category: CategoryType;
  theme: string;
}

export interface CategoryOption {
  id: CategoryType;
  title: string;
  description: string;
  icon: string;
}