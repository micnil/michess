import { Button, Flex, TextField } from '@radix-ui/themes';
import { Alert } from '../../../components/Alert';

type Props = {
  isLoading: boolean;
  onSubmit: (input: { email: string }) => void;
  error?: string;
};

export const RequestResetPasswordForm: React.FC<Props> = ({
  isLoading,
  onSubmit,
  error,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const email = formData.get('email') as string;

      onSubmit({ email });
    }}
  >
    <Flex direction="column" gap="3">
      <Alert text={error} />
      <TextField.Root
        name="email"
        type="email"
        placeholder="Email"
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
