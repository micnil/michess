import { Flex, Reset, Text } from '@radix-ui/themes';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Reset>
      <Flex asChild gap={'2'} align={'center'}>
        <Link to="/">
          <img src="/chess-monky-v1.svg" height={64} width={64} alt="logo" />
          <Text size={'4'} weight={'bold'}>
            chess monky
          </Text>
        </Link>
      </Flex>
    </Reset>
  );
};
