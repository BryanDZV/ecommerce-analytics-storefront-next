'use client';
import { createContext, useContext, useState } from 'react';

// Creamos el contexto
const FilterContext = createContext<any>(null);

// Creamos el Provider que envolverá tu aplicación
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
      {children}
    </FilterContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente
export const useFilters = () => useContext(FilterContext);
