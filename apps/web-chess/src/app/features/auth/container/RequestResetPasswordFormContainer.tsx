import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { SuccessMessage } from '../../../components/SuccessMessage';
import { RequestResetPasswordForm } from '../components/RequestResetPasswordForm';

export const RequestResetPasswordFormContainer = () => {
  const api = useApi();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async (formData: { email: string }) => {
      await api.auth.requestPasswordReset(formData.email);
    },
  });

  return !isSuccess ? (
    <RequestResetPasswordForm
      onSubmit={mutate}
      isLoading={isPending}
      error={error?.message}
    />
  ) : (
    <SuccessMessage message="Check your email for instructions to reset your password." />
  );
};
