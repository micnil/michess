import {
  QueryKey,
  useQuery as tanstackUseQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useAuth } from '../api/hooks/useAuth';

/**
 * Enhanced useQuery hook that automatically handles authentication.
 *
 * This wrapper around TanStack's useQuery automatically:
 * - Sets `enabled: isAuthenticated` unless explicitly disabled
 * - Preserves all original useQuery functionality and type safety
 *
 * @example
 * // Basic usage - automatically enabled when authenticated
 * const { data } = useQuery({
 *   queryKey: ['games'],
 *   queryFn: () => api.games.getGames()
 * });
 *
 * @example
 * // Explicitly disabled - won't run even when authenticated
 * const { data } = useQuery({
 *   queryKey: ['games'],
 *   queryFn: () => api.games.getGames(),
 *   enabled: false
 * });

 */

export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const { isAuthenticated } = useAuth();

  const enhancedOptions: UseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = {
    ...options,
    enabled: options.enabled !== false ? isAuthenticated : false,
  };

  const result = tanstackUseQuery(enhancedOptions);
  return result;
}
