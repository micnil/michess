import { Button, Flex, TextField } from '@radix-ui/themes';
import { FC } from 'react';
import { SignInInput } from '../../../api/model/SignInInput';

type Props = {
  isLoading: boolean;
  onSubmit: (input: SignInInput) => void;
};

export const SignInForm: FC<Props> = ({ isLoading }) => (
  <form>
    <Flex direction="column" gap="3">
      <TextField.Root
        type="email"
        placeholder="Email"
        required
        disabled={isLoading}
      />

      <TextField.Root
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
