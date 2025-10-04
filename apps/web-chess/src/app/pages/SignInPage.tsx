import { noop } from '@michess/common-utils';
import { Card, Flex, Text } from '@radix-ui/themes';

import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { Link } from '../components/Link';
import { OrSeparator } from '../components/OrSeparator';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { SignInForm } from '../features/auth/components/SignInForm';
import { SocialSignIn } from '../features/auth/components/SocialSignIn';

export const SignInPage: React.FC = () => {
  const [isLoading, _1] = useState(false);
  const [error, _2] = useState('');

  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4">
          <AuthCardHeader
            title="Sign in"
            subtitle="Welcome back! Please enter your details."
          />

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
            <Link route={{ to: '/sign-up' }}>Sign up</Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
