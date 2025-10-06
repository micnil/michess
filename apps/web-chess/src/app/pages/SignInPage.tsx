import { Card, Flex, Text } from '@radix-ui/themes';

import React from 'react';
import { Link } from '../components/Link';
import { OrSeparator } from '../components/OrSeparator';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { SignInFormContainer } from '../features/auth/container/SignInFormContainer';
import { SocialSignInContainer } from '../features/auth/container/SocialSignInContainer';

export const SignInPage: React.FC = () => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4">
          <AuthCardHeader
            title="Sign in"
            subtitle="Welcome back! Please enter your details."
          />

          <SignInFormContainer />
          <OrSeparator />
          <SocialSignInContainer />

          <Flex align="center" justify="center" gap="2">
            <Text size="2" color="gray">
              Don't have an account?
            </Text>
            <Link to="/sign-up">Sign up</Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
