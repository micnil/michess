import { Button, Flex, TextField } from '@radix-ui/themes';
import { FC } from 'react';
import { SignUpInput } from '../../../api/model/SignUpInput';
import { Alert } from '../../../components/Alert';
import { PasswordField } from '../../../components/PasswordField';

type Props = {
  isLoading: boolean;
  onSubmit: (input: SignUpInput) => void;
  error?: string;
};

export const SignUpForm: FC<Props> = ({ isLoading, error, onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      onSubmit({ name, email, password, confirmPassword });
    }}
  >
    <Flex direction="column" gap="3">
      <Alert text={error} />
      <TextField.Root
        name="name"
        placeholder="Name"
        required
        disabled={isLoading}
      />

      <TextField.Root
        name="email"
        type="email"
        placeholder="Email"
        required
        disabled={isLoading}
      />

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
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </Flex>
  </form>
);
