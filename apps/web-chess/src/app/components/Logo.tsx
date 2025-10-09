import { Flex, Reset, Text } from '@radix-ui/themes';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Reset>
      <Flex asChild align={'center'} gap={'2'}>
        <Link to="/">
          <img
            src="/chess-monky-side-v1.svg"
            height={48}
            width={48}
            alt="logo"
          />
          <Text size={'6'} weight={'bold'} color="amber">
            chess monky
          </Text>
        </Link>
      </Flex>
    </Reset>
  );
};
