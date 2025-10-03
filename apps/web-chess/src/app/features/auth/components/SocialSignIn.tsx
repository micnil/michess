import { noop } from '@michess/common-utils';
import { Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import FacebookIcon from './FacebookIcon';
import GoogleIcon from './GoogleIcon';

type SocialSignInProps = {
  isLoading?: boolean;
  onGoogleSignIn?: () => void;
  onFacebookSignIn?: () => void;
};

export const SocialSignIn: React.FC<SocialSignInProps> = ({
  isLoading = false,
  onGoogleSignIn = noop,
  onFacebookSignIn = noop,
}) => {
  return (
    <Flex direction="column" gap="2">
      <Button
        type="button"
        variant="outline"
        size="3"
        onClick={onGoogleSignIn}
        disabled={isLoading}
      >
        <GoogleIcon width={'16px'} fill="white" />
        <Text>Continue with Google</Text>
      </Button>

      <Button
        type="button"
        variant="outline"
        size="3"
        onClick={onFacebookSignIn}
        disabled={isLoading}
      >
        <FacebookIcon width={'16px'} fill="white" />
        <Text>Continue with Facebook</Text>
      </Button>
    </Flex>
  );
};
