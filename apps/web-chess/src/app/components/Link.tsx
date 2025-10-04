import { LinkProps, Link as RadixLink } from '@radix-ui/themes';

import { Link as RouterLink } from '@tanstack/react-router';

type Props = LinkProps & {
  route: React.ComponentProps<typeof RouterLink>;
  children: React.ReactNode;
};

export const Link = ({ children, route, ...props }: Props) => {
  return (
    <RadixLink {...props} asChild>
      <RouterLink {...route}>{children}</RouterLink>
    </RadixLink>
  );
};
