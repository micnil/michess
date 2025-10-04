import { Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import { Link } from '../components/Link';
import { OrSeparator } from '../components/OrSeparator';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { SignUpFormContainer } from '../features/auth/container/SignUpFormContainer';
import { SocialSignInContainer } from '../features/auth/container/SocialSignInContainer';

export const SignUpPage: React.FC = () => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4">
          <AuthCardHeader
            title="Sign up"
            subtitle="Create your account to get started"
          />
          <SignUpFormContainer />
          <OrSeparator />
          <SocialSignInContainer />
          <Flex align="center" justify="center" gap="2">
            <Text size="2" color="gray">
              Already have an account?
            </Text>
            <Link route={{ to: '/sign-in' }}>Sign in</Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
