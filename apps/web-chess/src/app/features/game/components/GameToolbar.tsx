import { Button, Flex, IconButton, Popover } from '@radix-ui/themes';
import { Separator } from '@radix-ui/themes/dist/cjs/components/context-menu';
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
      <Popover.Root>
        <Popover.Trigger>
          <IconButton
            size={'3'}
            variant="soft"
            color="gray"
            mx={'4'}
            radius="full"
          >
            <MenuIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content size="3">
          <Flex direction="column" gap="2" align={'start'}>
            <Button size="3" variant="ghost" color="gold">
              Offer draw
            </Button>
            <Separator />
            <Button size="3" variant="ghost" color="tomato">
              Resign
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
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
