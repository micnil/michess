import { Button, Flex, TextField } from '@radix-ui/themes';
import { FC } from 'react';
import { SignUpInput } from '../../../api/model/SignUpInput';
import { Alert } from '../../../components/Alert';
import { PasswordField } from '../../../components/PasswordField';
import { UsernameField } from './UsernameField';

type Props = {
  isLoading: boolean;
  onSubmit: (input: SignUpInput) => void;
  onUsernameChange: (username: string) => void;
  isUsernameAvailable?: boolean;
  error?: string;
};

export const SignUpForm: FC<Props> = ({
  isLoading,
  error,
  isUsernameAvailable,
  onSubmit,
  onUsernameChange,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const username = formData.get('username') as string;

        onSubmit({ name, email, password, confirmPassword, username });
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

        <UsernameField
          name="username"
          type="text"
          placeholder="Username"
          required
          isUsernameAvailable={isUsernameAvailable}
          disabled={isLoading}
          onChange={(e) => onUsernameChange(e.target.value)}
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
          loading={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Flex>
    </form>
  );
};
