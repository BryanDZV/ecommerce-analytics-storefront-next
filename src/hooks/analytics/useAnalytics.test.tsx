import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnalytics } from '@/hooks/analytics/useAnalytics';
import { getAnalytics } from '@/services/analyticsService';
import { analyticsData } from '@/mocks/mockAnalytics';

//jest.mock: Replaces the 'analyticsService' module with a mock version.
//This allows us to isolate the hook from its external dependencies (like a real API)
//and control the answers you receive during the test.
jest.mock('@/services/analyticsService', () => ({
  getAnalytics: jest.fn(), //jest.fn() creates a mocked "spy" function, without implementation.
}));

//jest.mocked: Provides strong typing and autocompletion for the mocked function.
const mockedGetAnalytics = jest.mocked(getAnalytics);

//createWrapper: Helper function to wrap the hook in the React Query context.
//Hooks that use `useQuery` need a `QueryClientProvider` in an ancestor component to work.
const createWrapper = () => {
  //QueryClient: React Query client instance. A new one is created for each test
  //to ensure that tests do not share state or cache, keeping them isolated.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, //We disable retries so that tests fail faster if something goes wrong.
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  // displayName: Assigns a readable name to the component to facilitate debugging.
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

// describe: Groups the tests related to the 'useAnalytics' hook.
describe('useAnalytics hook', () => {
  //beforeEach: Executed before each 'test' within this 'describe'.
  //We clean up the mocks to ensure that calls in one test do not affect the following ones.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //test: Defines a specific test case.
  test('returns dashboard analytics data', async () => {
    //.mockReturnValue(): The mock is configured to return a specific value (synchronous).
    //We simulate that the call to 'getAnalytics' returns our test data.
    mockedGetAnalytics.mockReturnValue(analyticsData);

    //renderHook: Renders a hook so that it can be tested in isolation.
    const { result } = renderHook(() => useAnalytics(), {
      wrapper: createWrapper(), // Se provee el wrapper con el contexto de React Query.
    });

    //waitFor: Waits asynchronously for a condition to be met.
    //Necessary because React Query performs data fetching asynchronously.
    //We wait for the hook to mark the query as successful ('isSuccess').
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    //expect: Checks that the result of the hook is as expected.
    //.toEqual: Compare the value of 'data' in the hook with our mock data.
    expect(result.current.data).toEqual(analyticsData);
    //.toHaveBeenCalledTimes: Verifies that the mock function was called the expected number of times (in this case, 1).
    expect(mockedGetAnalytics).toHaveBeenCalledTimes(1);
  });
});
