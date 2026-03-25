import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useFilteredProducts,
  useListProducts,
  useProduct,
} from '@/hooks/products/useProducts';
import {
  getFilteredProducts,
  getProductById,
  getProducts,
} from '@/services/productService';
import { products } from '@/mocks/mockProducts';
import { PaginatedResponse } from '@/types/paginatedResponse';
import { Product } from '@/types/product';
import { useFilterStore } from '@/store/useFilterStore'; // <-- Importado para controlar los filtros

//jest.mock: Replaces the real module 'productService' with a "mock" version.
//This allows us to control the behavior of its functions (e.g. getProducts) in the tests,
//preventing actual calls from being made to an API.
jest.mock('@/services/productService', () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  getFilteredProducts: jest.fn(),
}));

//jest.mocked: Wraps the imported function to give us auto-completion and typing of the mock.
//It is an aid for working with mocks in TypeScript.
const mockedGetProducts = jest.mocked(getProducts);
const mockedGetProductById = jest.mocked(getProductById);
const mockedGetFilteredProducts = jest.mocked(getFilteredProducts);

//createWrapper: Utility function that creates a "wrapper" component.
//To test react-query hooks, they need to be inside a QueryClientProvider.
//This wrapper provides us with that necessary context.
const createWrapper = () => {
  //QueryClient: Es el cerebro de react-query. Gestiona el cache, reintentos, etc.
  //In tests, we create a new instance for each test to ensure they are isolated.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, //We disable automatic retries so that tests do not take unnecessarily long.
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  //displayName: Give the component a name so it is easy to identify in React development tools.
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

//describe: Group related tests under the same block. Improves organization.
describe('useProducts hooks', () => {
  //beforeEach: Execute a function before each 'test' in this block.
  //Here we use it to clean up mocks and ensure that the state of one test does not affect another.
  beforeEach(() => {
    jest.clearAllMocks();
    // We clean the state of the store before each test so that there are no saved filters
    useFilterStore.setState({
      selectedCategory: null,
      priceOrder: null,
      nameOrder: null,
    });
  });

  //test: Defines an individual test case.
  test('useListProducts returns products list', async () => {
    const mockResponse: PaginatedResponse<Product> = {
      data: products,
      totalCount: products.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
    };
    //.mockReturnValue(): Defines what value the mocked function should return when called.
    //Here, we simulate a successful response from the API.
    mockedGetProducts.mockReturnValue(mockResponse);

    //renderHook: It is the main function of @testing-library/react.
    //Allows us to render a hook outside of a React component and observe its results.
    const { result } = renderHook(() => useListProducts(), {
      wrapper: createWrapper(), //We pass our wrapper to give it the react-query context.
    });

    //waitFor: Wait for an assertion (expect) to be fulfilled.
    //It is necessary because react-query fetches data asynchronously.
    //We wait for the hook state to be 'isSuccess'.
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    //expect: This is Jest's assertion function. Checks if a value meets a condition.
    //.toEqual(): Compare objects or arrays in depth (recursively).
    expect(result.current.data).toEqual(mockResponse);
    //.toHaveBeenCalledTimes(): Checks how many times a mock function was called.
    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
  });

  test('useProduct returns product details by id', async () => {
    const mockProduct = products[0];
    mockedGetProductById.mockReturnValue(mockProduct);
    const { result } = renderHook(() => useProduct(mockProduct.id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProduct);
    //.toHaveBeenCalledWith(): Verifies that a mock function was called with specific arguments.
    expect(mockedGetProductById).toHaveBeenCalledWith(mockProduct.id);
  });

  test('useProduct does not execute query if id is empty', () => {
    renderHook(() => useProduct(''), {
      wrapper: createWrapper(),
    });

    //.not.toHaveBeenCalled(): Verifies that a mock function was NEVER called.
    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  test('useFilteredProducts filters by categories', async () => {
    const category = products[0].category;
    const expectedProducts = products.filter((p) => p.category === category);

    const mockFilteredResponse: PaginatedResponse<Product> = {
      data: expectedProducts,
      totalCount: expectedProducts.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
    };

    //We set the category in the store so that the hook reads it
    useFilterStore.getState().setSelectedCategory(category);

    mockedGetFilteredProducts.mockReturnValue(mockFilteredResponse);
    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockFilteredResponse);
    //  We check the 3 arguments (category, null, null)
    expect(mockedGetFilteredProducts).toHaveBeenCalledWith(
      [category],
      null,
      null
    );
  });

  test('useFilteredProducts returns all when no category is selected', async () => {
    const mockResponse: PaginatedResponse<Product> = {
      data: products,
      totalCount: products.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
    };

    useFilterStore.setState({ selectedCategory: null });

    mockedGetFilteredProducts.mockReturnValue(mockResponse);
    const { result } = renderHook(() => useFilteredProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // We verify that when it is null, the hook sends an empty array [] to the service
    expect(mockedGetFilteredProducts).toHaveBeenCalledWith([], null, null);
    expect(result.current.data).toEqual(mockResponse);
  });
});
