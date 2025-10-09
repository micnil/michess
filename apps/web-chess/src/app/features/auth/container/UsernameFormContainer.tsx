import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useApi } from '../../../api/hooks/useApi';
import { useAuth } from '../../../api/hooks/useAuth';
import { UsernameForm } from '../components/UsernameForm';
import { useUsernameAvailability } from '../hooks/useUsernameAvailability';

export const UsernameFormContainer = () => {
  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const { isUsernameAvailable, checkUsername } = useUsernameAvailability();

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: (input: { username: string }) => {
      return api.auth.updateUser(input);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'session'], data);
      navigate({ to: '/' });
    },
  });

  return (
    <UsernameForm
      initialUsername={auth?.user?.username}
      onSubmit={signUp}
      onUsernameChange={checkUsername}
      isUsernameAvailable={isUsernameAvailable}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
