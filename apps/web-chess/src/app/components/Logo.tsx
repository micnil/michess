import { Flex, Reset, Text } from '@radix-ui/themes';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Reset>
      <Flex asChild gap={'2'} align={'center'}>
        <Link to="/">
          <img src="/knightv2.svg" height={42} width={42} alt="logo" />
          <Text size={'4'} weight={'bold'}>
            chess monky
          </Text>
        </Link>
      </Flex>
    </Reset>
  );
};
