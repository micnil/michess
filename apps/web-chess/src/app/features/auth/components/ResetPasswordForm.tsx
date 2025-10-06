import { Button, Flex } from '@radix-ui/themes';
import { Alert } from '../../../components/Alert';
import { PasswordField } from '../../../components/PasswordField';

type Props = {
  isLoading: boolean;
  onSubmit: (input: { password: string; confirmPassword: string }) => void;
  error?: string;
};

export const ResetPasswordForm: React.FC<Props> = ({
  isLoading,
  onSubmit,
  error,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      onSubmit({ password, confirmPassword });
    }}
  >
    <Flex direction="column" gap="3">
      <Alert text={error} />
      <PasswordField
        name="password"
        type="password"
        placeholder="Password"
        required
        disabled={isLoading}
      />

      <PasswordField
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
        disabled={isLoading}
      />

      <Button
        mt={'1'}
        type="submit"
        size="2"
        style={{ width: '100%' }}
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? 'Submitting' : 'Submit'}
      </Button>
    </Flex>
  </form>
);
