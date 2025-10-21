import { noop } from '@michess/common-utils';
import { Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import GoogleIcon from './GoogleIcon';

type SocialSignInProps = {
  isLoading?: boolean;
  onGoogleSignIn?: () => void;
};

export const SocialSignIn: React.FC<SocialSignInProps> = ({
  isLoading = false,
  onGoogleSignIn = noop,
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
    </Flex>
  );
};
