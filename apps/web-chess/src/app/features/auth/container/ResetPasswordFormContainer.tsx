import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useApi } from '../../../api/hooks/useApi';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
type Props = {
  token: string;
};

export const ResetPasswordFormContainer = ({ token }: Props) => {
  const api = useApi();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: {
      password: string;
      confirmPassword: string;
    }) => {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await api.auth.resetPassword(token, formData.password);
    },
    onSuccess: () => {
      navigate({ to: '/sign-in', replace: true });
    },
  });

  return (
    <ResetPasswordForm
      onSubmit={mutate}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
