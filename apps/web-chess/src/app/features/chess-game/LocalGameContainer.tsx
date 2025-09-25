import { Color, Move } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Grid } from '@radix-ui/themes';

export const LocalGameContainer = ({
  orientation,
}: {
  orientation?: Color;
}) => {
  return (
    <Grid
      columns={{ initial: '1', sm: '1fr auto 1fr' }}
      style={{ justifyItems: 'center' }}
      gap={{ initial: '1', sm: '4' }}
    >
      <Box display={'inline-block'} gridColumn={{ initial: '1', sm: '2' }}>
        <ChessboardView<Move> orientation={orientation} maxSize={600} />
      </Box>
    </Grid>
  );
};
