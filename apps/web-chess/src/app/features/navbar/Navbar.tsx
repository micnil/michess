import { Box, Flex } from '@radix-ui/themes';
import { FC, ReactNode } from 'react';
import { Logo } from '../../components/Logo';

type Props = {
  children?: ReactNode;
};

export const Navbar: FC<Props> = () => {
  return (
    <Flex>
      <Box flexGrow={'1'} style={{ backgroundColor: '--gray9' }}>
        {/* <Card> */}
        <Logo />
        {/* </Card> */}
      </Box>
    </Flex>
  );
};
