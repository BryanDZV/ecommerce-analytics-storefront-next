'use client';

import { useFilterStore } from '@/store/useFilterStore';
import { useFilteredProducts } from '@/hooks/products/useProducts';

export default function Pagination() {
  const { currentPage, setCurrentPage, pageSize, setPageSize } =
    useFilterStore();
  const { data, prefetchNextPage } = useFilteredProducts();

  //if (!data || data.totalPages <= 1) return null;

  const pages = [];

  if (data && typeof data.totalPages === 'number' && data.totalPages > 0) {
    for (let i = 1; i <= data.totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <nav
      aria-label="Navegación de productos"
      className="flex flex-col md:flex-row items-center justify-center gap-6 mt-14 mb-10"
    >
      <ul className="flex -space-x-px text-sm">
        {/* Botón Anterior */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-700 bg-[#e0e0cc] border border-gray-300 rounded-s-lg hover:bg-[#d0d0bc] disabled:opacity-40 transition-colors disabled:cursor-not-allowed active:scale-95"
          >
            Anterior
          </button>
        </li>

        {/* Números de Página Dinámicos */}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              //  página actual, usamos un azul suave
              className={`flex items-center justify-center w-10 h-10 leading-tight border border-gray-300 transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600 z-10'
                  : 'bg-[#e0e0cc] text-gray-700 hover:bg-[#d0d0bc]'
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botón Siguiente */}
        <li>
          <button
            disabled={!data?.hasNextPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            onMouseEnter={() => prefetchNextPage()} // LAZY LOADING (PREFETCH)
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-700 bg-[#e0e0cc] border border-gray-300 rounded-e-lg hover:bg-[#d0d0bc] disabled:opacity-40 transition-colors disabled:cursor-not-allowed active:scale-95"
          >
            Siguiente
          </button>
        </li>
      </ul>

      {/* Selector (PageSize) */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="pageSize"
          className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
        >
          Ver:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="block p-2 text-sm text-gray-700 bg-[#e0e0cc] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer "
        >
          <option value="4">4 por pág.</option>
          <option value="8">8 por pág.</option>
          <option value="12">12 por pág.</option>
          <option value="20">20 por pág.</option>
        </select>
      </div>
    </nav>
  );
}
