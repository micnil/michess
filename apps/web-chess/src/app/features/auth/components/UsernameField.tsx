import { TextField } from '@radix-ui/themes';
import { FC, useEffect, useRef } from 'react';

type Props = TextField.RootProps &
  React.RefAttributes<HTMLInputElement> & {
    isUsernameAvailable?: boolean;
  };

export const UsernameField: FC<Props> = ({ isUsernameAvailable, ...props }) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    usernameInputRef.current?.setCustomValidity(
      isUsernameAvailable ? '' : 'Username is already taken',
    );
    if (isUsernameAvailable === false) {
      usernameInputRef.current?.reportValidity();
    }
  }, [isUsernameAvailable]);

  return <TextField.Root minLength={3} ref={usernameInputRef} {...props} />;
};
