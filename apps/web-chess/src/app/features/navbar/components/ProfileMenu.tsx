import { Maybe } from '@michess/common-utils';
import { Avatar, DropdownMenu, IconButton } from '@radix-ui/themes';
import { FC } from 'react';
import { User } from '../../../api/model/User';

type Props = {
  user: Maybe<User>;
  signOut: () => void;
};

export const ProfileMenu: FC<Props> = ({ user, signOut }) => {
  if (!user) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" radius="full">
          <Avatar src={user.image} fallback={user.name.charAt(0)} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={signOut}>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
