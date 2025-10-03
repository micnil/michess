import { Button, Flex, TextField } from '@radix-ui/themes';
import { FC } from 'react';
import { SignUpInput } from '../../../api/model/SignUpInput';

type Props = {
  isLoading: boolean;
  onSubmit: (input: SignUpInput) => void;
};

export const SignUpForm: FC<Props> = ({ isLoading }) => (
  <form>
    <Flex direction="column" gap="3">
      <TextField.Root placeholder="Name" required disabled={isLoading} />

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

      <TextField.Root
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
