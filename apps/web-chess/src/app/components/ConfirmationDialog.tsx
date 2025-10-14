import { Button, Dialog, Flex } from '@radix-ui/themes';
import { FC } from 'react';

type Props = {
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmColor?: 'tomato' | 'amber';
  cancelLabel?: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

export const ConfirmationDialog: FC<Props> = ({
  children,
  onConfirm,
  title,
  description,
  confirmColor = 'amber',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content size="2" width={'300px'}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Flex gap="5" justify="center" mt="4">
          <Dialog.Close>
            <Button color={confirmColor} onClick={() => onConfirm()}>
              {confirmLabel}
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="gray">{cancelLabel}</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
