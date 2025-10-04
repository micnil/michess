import { Button, Flex, TextField } from '@radix-ui/themes';
import { FC } from 'react';
import { SignInInput } from '../../../api/model/SignInInput';
import { Alert } from '../../../components/Alert';

type Props = {
  isLoading: boolean;
  onSubmit: (input: SignInInput) => void;
  error?: string;
};

export const SignInForm: FC<Props> = ({ isLoading, error, onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      onSubmit({ email, password });
    }}
  >
    <Alert text={error} />
    <Flex direction="column" gap="3">
      <TextField.Root
        name="email"
        type="email"
        placeholder="Email"
        required
        disabled={isLoading}
      />

      <TextField.Root
        name="password"
        type="password"
        placeholder="Password"
        required
        disabled={isLoading}
      />

      <Button
        mt={'1'}
        type="submit"
        size="2"
        style={{ width: '100%' }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Flex>
  </form>
);
