import { Callout } from '@radix-ui/themes';
import { TriangleAlert } from 'lucide-react';

type Props = Callout.RootProps & {
  text?: string;
};
export const Alert = (props: Props) => {
  return props.text ? (
    <Callout.Root color="red" role="alert" {...props}>
      <Callout.Icon>
        <TriangleAlert />
      </Callout.Icon>
      <Callout.Text>{props.text}</Callout.Text>
    </Callout.Root>
  ) : undefined;
};
