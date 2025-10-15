import { DrawReasonV1, GameActionOptionV1 } from '@michess/api-schema';
import { Button, Flex, IconButton, Popover } from '@radix-ui/themes';
import { Separator } from '@radix-ui/themes/dist/cjs/components/context-menu';
import { ArrowBigLeftIcon, ArrowBigRightIcon, MenuIcon } from 'lucide-react';
import { FC } from 'react';
import { Alert } from '../../../components/Alert';
import { ConfirmationDialog } from '../../../components/ConfirmationDialog';
import { PeekActions } from '../model/PeekHandlers';

type Props = {
  actionOptions: GameActionOptionV1[];
  isPending?: boolean;
  error?: Error;
  peekActions: PeekActions;
  onMakeAction: (action: GameActionOptionV1) => void;
};

const getActionLabel = (drawReasonType: DrawReasonV1): string => {
  switch (drawReasonType) {
    case 'by_agreement':
      return 'Accept draw';
    case 'threefold_repetition':
    case 'fifty_move_rule':
    case 'insufficient_material':
      return 'Claim draw';
    default:
      return 'Accept draw';
  }
};

export const GameToolbar: FC<Props> = ({
  actionOptions,
  onMakeAction,
  error,
  isPending,
  peekActions,
}) => {
  const resignOption = actionOptions.find((option) => option.type === 'resign');
  const offerDrawOption = actionOptions.find(
    (option) => option.type === 'offer_draw',
  );

  const promotedActions = actionOptions
    .filter(
      (option) => option.type !== 'resign' && option.type !== 'offer_draw',
    )
    .map((option) => ({
      ...option,
      label:
        option.type === 'accept_draw'
          ? getActionLabel(option.reason)
          : option.type,
    }));
  return (
    <>
      {promotedActions.map((action) => (
        <Button my="2" key={action.type} onClick={() => onMakeAction(action)}>
          {action.label}
        </Button>
      ))}
      <Alert text={error?.message} />
      <Flex direction="row" justify="between" align="center" p="2">
        <Button
          size={'3'}
          variant="ghost"
          color="gray"
          style={{
            flex: 1,
            display: 'flex',
          }}
          onClick={peekActions.back}
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
              loading={isPending}
            >
              <MenuIcon />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content size="3">
            <Flex direction="column" gap="2">
              <Button
                size="4"
                variant="ghost"
                color="gold"
                style={{ width: '100%' }}
                disabled={!offerDrawOption}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                onClick={() => onMakeAction(offerDrawOption!)}
              >
                Offer draw
              </Button>
              <Separator />

              <ConfirmationDialog
                title="Confirm Resignation"
                description="Are you sure you want to resign?"
                onConfirm={() => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onMakeAction(resignOption!);
                }}
                cancelLabel="Cancel"
                confirmColor="tomato"
                confirmLabel="Resign"
              >
                <Button
                  size="4"
                  variant="ghost"
                  color="tomato"
                  disabled={!resignOption}
                  style={{ width: '100%' }}
                >
                  Resign
                </Button>
              </ConfirmationDialog>
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
          onClick={peekActions.forward}
        >
          <ArrowBigRightIcon />
        </Button>
      </Flex>
    </>
  );
};
