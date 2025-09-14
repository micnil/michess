import { Maybe } from '@michess/common-utils';
import { authClient } from '../infra/authClient';

type UseSession = {
  loading: boolean;
  session: Maybe<{
    userId: string;
  }>;
  error: Maybe<Error>;
};

export const useSession = (): UseSession => {
  const { isPending, data, error } = authClient.useSession();
  return {
    loading: isPending,
    session: data
      ? {
          userId: data.user.id,
        }
      : undefined,
    error: error?.error,
  };
};
