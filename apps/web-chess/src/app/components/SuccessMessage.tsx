import { Callout } from '@radix-ui/themes';
import { CheckCircleIcon } from 'lucide-react';
import { FC } from 'react';

type Props = {
  message?: string;
};
export const SuccessMessage: FC<Props> = ({ message }) => {
  return message ? (
    <Callout.Root color="green">
      <Callout.Icon>
        <CheckCircleIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  ) : null;
};
