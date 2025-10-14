import { Button, Flex, IconButton } from '@radix-ui/themes';
import { ArrowBigLeftIcon, ArrowBigRightIcon, MenuIcon } from 'lucide-react';
import { FC } from 'react';

export const GameToolbar: FC = () => {
  return (
    <Flex direction="row" justify="between" align="center" p="2">
      <Button
        size={'3'}
        variant="ghost"
        color="gray"
        style={{
          flex: 1,
          display: 'flex',
        }}
      >
        <ArrowBigLeftIcon />
      </Button>
      <IconButton size={'3'} variant="soft" color="gray" mx={'4'} radius="full">
        <MenuIcon />
      </IconButton>
      <Button
        size={'3'}
        variant="ghost"
        color="gray"
        style={{
          flex: 1,
          display: 'flex',
        }}
      >
        <ArrowBigRightIcon />
      </Button>
    </Flex>
  );
};
