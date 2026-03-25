import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from './ProductGrid';
import { useListProducts } from '@/hooks/products/useProducts';

// 1. Mockeamos el Custom Hook (La ruta @/ no cambia sin importar dónde estemos)
jest.mock('@/hooks/products/useProducts', () => ({
  useListProducts: jest.fn(),
}));

// 2. Mockeamos ProductCard (Como ambos están en 'products', la ruta es simplemente ./)
jest.mock('./ProductCard', () => {
  return function DummyProductCard({ product }: any) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

describe('Componente ProductGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el estado de carga (isLoading)', () => {
    (useListProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<ProductGrid />);

    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  test('renderiza el estado de error (isError)', () => {
    (useListProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<ProductGrid />);

    expect(screen.getByText('Error al cargar productos')).toBeInTheDocument();
  });

  test('renderiza la lista de productos correctamente', () => {
    const mockData = {
      data: [
        { id: 1, name: 'Camiseta' },
        { id: 2, name: 'Pantalón' },
      ],
    };

    (useListProducts as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<ProductGrid />);

    const tarjetas = screen.getAllByTestId('product-card');
    expect(tarjetas).toHaveLength(2);
    expect(screen.getByText('Camiseta')).toBeInTheDocument();
    expect(screen.getByText('Pantalón')).toBeInTheDocument();
  });
});
