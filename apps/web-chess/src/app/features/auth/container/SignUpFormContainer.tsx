import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { SignUpInput } from '../../../api/model/SignUpInput';
import { SignUpForm } from '../components/SignUpForm';

export const SignUpFormContainer = () => {
  const api = useApi();
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
  });

  return (
    <SignUpForm
      onSubmit={signUp}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
