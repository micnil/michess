import { Box } from '@radix-ui/themes';

export const BackgroundGradient = () => (
  <Box
    right={'0'}
    left={'0'}
    height={'480px'}
    position={'absolute'}
    style={{
      opacity: 0.6,
      background: 'linear-gradient(to bottom, var(--accent-4), transparent)',
    }}
  />
);
