import { Box, Button, Flex } from '@radix-ui/themes';
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
          <Button size={'2'} color="amber">
            Sign up
          </Button>
          <Button size={'2'} color="amber" variant={'outline'}>
            Log in
          </Button>
        </>
      ) : undefined}
    </Flex>
  );
};
