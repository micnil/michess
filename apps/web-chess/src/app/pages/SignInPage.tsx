import { noop } from '@michess/common-utils';
import { Box, Card, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { Link as RouterLink } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { OrSeparator } from '../components/OrSeparator';
import { SignInForm } from '../features/auth/components/SignInForm';
import { SocialSignIn } from '../features/auth/components/SocialSignIn';

export const SignInPage: React.FC = () => {
  const [isLoading, _1] = useState(false);
  const [error, _2] = useState('');

  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4">
          <Box style={{ textAlign: 'center' }}>
            <Heading size="6" mb="2">
              Sign in
            </Heading>
            <Text color="gray" size="2">
              Welcome back! Please enter your details.
            </Text>
          </Box>

          <Alert text={error} />

          <SignInForm isLoading={isLoading} onSubmit={noop} />
          <OrSeparator />
          <SocialSignIn
            isLoading={isLoading}
            onGoogleSignIn={noop}
            onFacebookSignIn={noop}
          />

          <Flex align="center" justify="center" gap="2">
            <Text size="2" color="gray">
              Don't have an account?
            </Text>
            <Link asChild>
              <RouterLink to="/sign-up">Sign up</RouterLink>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
