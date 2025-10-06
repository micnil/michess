import { Link as RadixLink } from '@radix-ui/themes';

import { createLink } from '@tanstack/react-router';

export const Link = createLink(RadixLink);
// type Props = LinkProps & {
//   route: React.ComponentProps<typeof RouterLink>;
//   children: React.ReactNode;
// };

// export const Link: LinkComponent<'a'> = ({ children, ...props }) => {
//   return (
//     <RadixLink {...props} asChild>
//       <RouterLink {...route}>{children}</RouterLink>
//     </RadixLink>
//   );
// };
