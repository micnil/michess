import { Card, Flex, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { Alert } from '../components/Alert';
import { Link } from '../components/Link';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { ResetPasswordFormContainer } from '../features/auth/container/ResetPasswordFormContainer';

type Props = {
  token?: string;
};

export const ResetPasswordPage: FC<Props> = ({ token }) => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4">
          <AuthCardHeader
            title="Reset Password"
            subtitle="Complete the form to reset your password"
          />
          {token ? (
            <ResetPasswordFormContainer token={token} />
          ) : (
            <Alert text="Something went wrong. Please try resetting your password again." />
          )}

          <Flex align="center" justify="center" gap="2">
            <Text size="2" color="gray">
              Remembered your login?
            </Text>
            <Link to="/sign-in">Sign in</Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
