import { Card, Flex, Text } from '@radix-ui/themes';

import { FC } from 'react';
import { Link } from '../components/Link';
import { TextSeparator } from '../components/TextSeparator';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { RequestResetPasswordFormContainer } from '../features/auth/container/RequestResetPasswordFormContainer';

export const RequestResetPasswordPage: FC = () => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="5">
          <AuthCardHeader
            title="Reset Password"
            subtitle="Enter your email to reset your password"
          />
          <RequestResetPasswordFormContainer />
          <TextSeparator text="OR" />
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
