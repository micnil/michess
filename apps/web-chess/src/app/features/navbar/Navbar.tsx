import { Box, Flex, Link } from '@radix-ui/themes';
import { Link as RouterLink } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';
import { useAuth } from '../../api/hooks/useAuth';
import { Logo } from '../../components/Logo';

type Props = {
  children?: ReactNode;
};

export const Navbar: FC<Props> = () => {
  const { auth, isLoading } = useAuth();
  return (
    <Flex align={'center'} gap={'2'}>
      <Box flexGrow={'1'} style={{ backgroundColor: '--gray9' }}>
        <Logo />
      </Box>
      {!isLoading || auth?.user.isAnonymous ? (
        <>
          <Link asChild size={'3'} color="amber">
            <RouterLink to="/sign-up">Sign up</RouterLink>
          </Link>
          <Link size={'2'} color="amber">
            Log in
          </Link>
        </>
      ) : undefined}
    </Flex>
  );
};
