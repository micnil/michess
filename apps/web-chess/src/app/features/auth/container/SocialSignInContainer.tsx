import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { SocialSignIn } from '../components/SocialSignIn';

export const SocialSignInContainer = () => {
  const api = useApi();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await api.auth.signInWithGoogle();
    },
  });
  return <SocialSignIn isLoading={isPending} onGoogleSignIn={mutate} />;
};
