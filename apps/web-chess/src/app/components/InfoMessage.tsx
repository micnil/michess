import { Callout } from '@radix-ui/themes';
import { InfoIcon } from 'lucide-react';

type Props = Callout.RootProps & {
  message: string;
};
export const InfoMessage = ({ message, ...props }: Props) => {
  return (
    <Callout.Root {...props} color="indigo" variant="outline">
      <Callout.Icon>
        <InfoIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};
