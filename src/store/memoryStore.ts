import { create } from 'zustand';
import { Memory, CategoryType } from '../types';
import { generateId } from '../utils/helpers';

interface MemoryStore {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  getMemory: (id: string) => Memory | undefined;
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  memories: [],
  addMemory: (memoryData) => {
    const memory: Memory = {
      ...memoryData,
      id: generateId(),
    };
    set((state) => ({
      memories: [...state.memories, memory],
    }));
    return memory;
  },
  getMemory: (id) => {
    return get().memories.find((memory) => memory.id === id);
  },
}));