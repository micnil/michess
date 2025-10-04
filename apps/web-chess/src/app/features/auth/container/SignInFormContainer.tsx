import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { SignInInput } from '../../../api/model/SignInInput';
import { SignInForm } from '../components/SignInForm';

export const SignInFormContainer = () => {
  const api = useApi();
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: (input: SignInInput) => api.auth.signIn(input),
  });

  return (
    <SignInForm
      onSubmit={signIn}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
