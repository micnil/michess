import { noop } from '@michess/common-utils';
import { useState } from 'react';
import { SocialSignIn } from '../components/SocialSignIn';

export const SocialSignInContainer = () => {
  const [isLoading, _] = useState(false);
  return (
    <SocialSignIn
      isLoading={isLoading}
      onGoogleSignIn={noop}
      onFacebookSignIn={noop}
    />
  );
};
