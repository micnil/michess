import { noop } from '@michess/common-utils';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Link as RouterLink, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';

import { Alert } from '../components/Alert';
import FacebookIcon from '../features/signup/components/FacebookIcon';
import GoogleIcon from '../features/signup/components/GoogleIcon';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, _1] = useState(false);
  const [error, _2] = useState('');

  return (
    <Container size="1">
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: '100vh', padding: '2rem 0' }}
      >
        <Card size="3" style={{ width: '100%', maxWidth: '400px' }}>
          <form>
            <Flex direction="column" gap="4">
              <Box style={{ textAlign: 'center' }}>
                <Heading size="6" mb="2">
                  Sign up
                </Heading>
                <Text color="gray" size="2">
                  Create your account to get started
                </Text>
              </Box>

              <Alert text={error} />

              <Flex direction="column" gap="3">
                <TextField.Root
                  placeholder="Name"
                  required
                  disabled={isLoading}
                />

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
                  Already have an account?
                </Text>
                <Link asChild>
                  <RouterLink to="/sign-in">Sign in</RouterLink>
                </Link>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};
