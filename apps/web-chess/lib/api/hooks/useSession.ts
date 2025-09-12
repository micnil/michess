import { Maybe } from '@michess/common-utils';
import { authClient } from '../infra/authClient';

type UseSession = {
  loading: boolean;
  session: {
    userId: string;
  };
  error: Maybe<Error>;
};

export const useSession = (): UseSession => {
  const { isPending, data, error } = authClient.useSession();
  return {
    loading: isPending,
    session: {
      userId: data.user.id,
    },
    error,
  };
};
