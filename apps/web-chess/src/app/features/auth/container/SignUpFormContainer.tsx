import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useApi } from '../../../api/hooks/useApi';
import { SignUpInput } from '../../../api/model/SignUpInput';
import { useDebounce } from '../../../util/useDebounce';
import { useQuery } from '../../../util/useQuery';
import { SignUpForm } from '../components/SignUpForm';

export const SignUpFormContainer = () => {
  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsernameDebounced] = useDebounce('', 1000);
  const { data: isUsernameAvailable } = useQuery({
    queryKey: ['auth', 'usernameAvailability', username],
    queryFn: () => api.auth.isUsernameAvailable(username),
    enabled: username.length > 0,
    initialData: true,
  });

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: (input: SignUpInput) => {
      if (input.password !== input.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      return api.auth.signUp(input);
    },
    onSuccess: (data) => {
      navigate({ to: '/' });
      queryClient.setQueryData(['auth', 'session'], data);
    },
  });

  return (
    <SignUpForm
      onSubmit={signUp}
      onUsernameChange={setUsernameDebounced}
      isUsernameAvailable={isUsernameAvailable}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
