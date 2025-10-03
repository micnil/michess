import { noop } from '@michess/common-utils';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Link as RouterLink } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import FacebookIcon from '../features/auth/components/FacebookIcon';
import GoogleIcon from '../features/auth/components/GoogleIcon';

export const SignInPage: React.FC = () => {
  const [isLoading, _1] = useState(false);
  const [error, _2] = useState('');

  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <form>
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

            <Flex align="center" gap="3">
              <Separator size="4" style={{ flex: 1 }} />
              <Text size="1" color="gray">
                OR
              </Text>
              <Separator size="4" style={{ flex: 1 }} />
            </Flex>

            <Flex direction="column" gap="2">
              <Button
                type="button"
                variant="outline"
                size="3"
                onClick={noop}
                disabled={isLoading}
              >
                <GoogleIcon width={'16px'} fill="white" />
                <Text>Continue with Google</Text>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="3"
                onClick={noop}
                disabled={isLoading}
              >
                <FacebookIcon width={'16px'} fill="white" />
                <Text>Continue with Facebook</Text>
              </Button>
            </Flex>

            <Flex align="center" justify="center" gap="2">
              <Text size="2" color="gray">
                Don't have an account?
              </Text>
              <Link asChild>
                <RouterLink to="/sign-up">Sign up</RouterLink>
              </Link>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};
