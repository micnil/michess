import { Box, Flex, Link } from '@radix-ui/themes';
import { Link as RouterLink } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';
import { useAuth } from '../../api/hooks/useAuth';
import { Logo } from '../../components/Logo';
import { ProfileMenu } from './components/ProfileMenu';

type Props = {
  children?: ReactNode;
};

export const Navbar: FC<Props> = () => {
  const { auth, isLoading, signOut } = useAuth();
  return (
    <Flex align={'center'} gap={'3'}>
      <Box flexGrow={'1'} style={{ backgroundColor: '--gray9' }}>
        <Logo />
      </Box>
      {!isLoading && auth?.user.isAnonymous ? (
        <>
          <Link asChild size={'3'} color="gray">
            <RouterLink to="/sign-in">Log in</RouterLink>
          </Link>
          <Link asChild size={'3'} color="amber">
            <RouterLink to="/sign-up">Sign up</RouterLink>
          </Link>
        </>
      ) : (
        <ProfileMenu user={auth?.user} signOut={signOut} />
      )}
    </Flex>
  );
};
