import { Maybe } from '@michess/common-utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthState } from '../model/AuthState';
import { useApi } from './useApi';

type UseAuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  auth: Maybe<AuthState>;
  error: Maybe<string>;
  signOut: () => void;
  refetchSession: () => void;
  isSigningOut: boolean;
};

const AUTH_QUERY_KEY = ['auth', 'session'];

export const useAuth = (): UseAuthState => {
  const api = useApi();
  const queryClient = useQueryClient();

  // Query to get and ensure session
  const {
    data: authState,
    isLoading,
    error,
    refetch,
  } = useQuery<AuthState>({
    queryKey: AUTH_QUERY_KEY,
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async () => {
      try {
        const result = await api.auth.ensureAnonymousSession();
        return result;
      } catch (error) {
        console.error('Auth session query failed:', error);
        throw error;
      }
    },
  });

  // Mutation for sign out
  const signOutMutation = useMutation<AuthState>({
    mutationFn: async () => {
      await api.auth.signOut();
      // After sign out, automatically sign in anonymously again
      const result = await api.auth.signInAnonymously();
      return result;
    },
    onSuccess: (newSessionData) => {
      // Update the query cache with new session data
      queryClient.setQueryData(AUTH_QUERY_KEY, newSessionData);
    },
    onError: (error) => {
      console.error('Sign out failed:', error);
    },
  });

  const isAuthenticated = !!authState;

  const signOut = () => {
    signOutMutation.mutate();
  };

  const refetchSession = () => {
    refetch();
  };
  const useAuthState: UseAuthState = {
    isLoading: isLoading || signOutMutation.isPending,
    isAuthenticated,
    auth: authState,
    error: error?.message || signOutMutation.error?.message || undefined,
    signOut,
    refetchSession,
    isSigningOut: signOutMutation.isPending,
  };

  return useAuthState;
};
