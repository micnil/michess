import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { Alert } from '../../../components/Alert';
import { UsernameField } from './UsernameField';

type Props = {
  isLoading: boolean;
  initialUsername?: string;
  onSubmit: (input: { username: string }) => void;
  onUsernameChange: (username: string) => void;
  isUsernameAvailable?: boolean;
  error?: string;
};

export const UsernameForm: FC<Props> = ({
  isLoading,
  initialUsername,
  onSubmit,
  onUsernameChange,
  isUsernameAvailable,
  error,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;

        onSubmit({ username });
      }}
    >
      <Flex direction="column" gap="3">
        <Alert text={error} />
        <Box>
          <Text as="label" htmlFor="username">
            Username
          </Text>
          <UsernameField
            id="username"
            name="username"
            defaultValue={initialUsername}
            type="text"
            placeholder="Username"
            isUsernameAvailable={isUsernameAvailable}
            required
            disabled={isLoading}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </Box>

        <Button
          mt={'1'}
          type="submit"
          size="2"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};
