import { useApi } from '../../../api/hooks/useApi';
import { useDebounce } from '../../../util/useDebounce';
import { useQuery } from '../../../util/useQuery';

type UseUsernameAvailability = {
  isUsernameAvailable: boolean | undefined;
  checkUsername: (username: string) => void;
};

export const useUsernameAvailability = (): UseUsernameAvailability => {
  const api = useApi();
  const [username, setUsernameDebounced] = useDebounce('', 1000);
  const { data: isUsernameAvailable } = useQuery({
    queryKey: ['auth', 'usernameAvailability', username],
    queryFn: () => api.auth.isUsernameAvailable(username),
    enabled: username.length > 0,
    initialData: true,
  });

  return {
    isUsernameAvailable,
    checkUsername: setUsernameDebounced,
  };
};
