import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useFilteredProducts, useProduct } from '@/hooks/products/useProducts';
import { getFilteredProducts, getProductById } from '@/services/productService';
import { products } from '@/mocks/mockProducts';
import { PaginatedResponse } from '@/types/paginatedResponse';
import { Product } from '@/types/product';
import { useFilterStore } from '@/store/useFilterStore'; // <-- Importado para controlar los filtros

//jest.mock: Replaces the real module 'productService' with a "mock" version.
//This allows us to control the behavior of its functions in the tests.
jest.mock('@/services/productService', () => ({
  getProductById: jest.fn(),
  getFilteredProducts: jest.fn(),
}));

const mockedGetProductById = jest.mocked(getProductById);
const mockedGetFilteredProducts = jest.mocked(getFilteredProducts);

//createWrapper: Utility function that creates a "wrapper" component for react-query context.
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('useProducts hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // We clean the state of the store before each test so that there are no saved filters
    useFilterStore.setState({
      selectedCategory: null,
      priceOrder: null,
      nameOrder: null,
      currentPage: 1, // Reset de página
    });
  });

  /* --- TESTS PARA DETALLE DE PRODUCTO --- */

  test('useProduct returns product details by id', async () => {
    const mockProduct = products[0];
    mockedGetProductById.mockReturnValue(mockProduct);
    const { result } = renderHook(() => useProduct(mockProduct.id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProduct);
    expect(mockedGetProductById).toHaveBeenCalledWith(mockProduct.id);
  });

  test('useProduct does not execute query if id is empty', () => {
    renderHook(() => useProduct(''), {
      wrapper: createWrapper(),
    });

    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  /* --- TESTS PARA FILTRADO/PAGINADO --- */

  test('useFilteredProducts filters by categories', async () => {
    const category = products[0].category;
    const expectedProducts = products
      .filter((p) => p.category === category)
      .slice(0, 2);

    const mockFilteredResponse: PaginatedResponse<Product> = {
      data: expectedProducts,
      totalCount: expectedProducts.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      pageSize: 8,
    };

    useFilterStore.getState().setSelectedCategory(category);

    mockedGetFilteredProducts.mockReturnValue(mockFilteredResponse);
    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockFilteredResponse);

    // Verificamos que el hook llame al servicio con los 5 argumentos correctos
    expect(mockedGetFilteredProducts).toHaveBeenCalledWith(
      [category],
      null,
      null,
      1,
      8 //   pageSize esperado a 8
    );
  });

  test('useFilteredProducts returns first page when no category is selected', async () => {
    const mockResponse: PaginatedResponse<Product> = {
      data: products.slice(0, 2),
      totalCount: products.length,
      page: 1,
      totalPages: 20,
      hasNextPage: true,
      pageSize: 2,
    };

    useFilterStore.setState({ selectedCategory: null, currentPage: 1 });

    mockedGetFilteredProducts.mockReturnValue(mockResponse);
    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verificamos la llamada con array vacío para categorías
    expect(mockedGetFilteredProducts).toHaveBeenCalledWith(
      [],
      null,
      null,
      1,
      8 //   pageSize esperado a 8
    );
    expect(result.current.data).toEqual(mockResponse);
  });
});
