import { Color, MoveNotation } from '@michess/core-board';
import { Badge, Box, Flex, Grid, ScrollArea, Text } from '@radix-ui/themes';
import { FC, useEffect, useRef } from 'react';
import styles from './MovesRecord.module.css';

type Props = {
  moves: MoveNotation[];
  orientation: 'horizontal' | 'vertical';
};

export const MovesRecord: FC<Props> = ({ moves, orientation }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [moves]);

  const movesGrouped = Map.groupBy(moves, (move) => move.moveNumber);

  if (moves.length === 0) {
    return (
      <Box p="2" style={{ textAlign: 'center', color: 'var(--gray-11)' }}>
        No moves yet
      </Box>
    );
  } else {
    return (
      <ScrollArea
        ref={ref}
        className={styles.faded}
        type="always"
        m={'1'}
        scrollbars={orientation}
        size={'1'}
        style={{
          minWidth: '100%',
          width: '0',
        }}
      >
        <Flex
          gap="4"
          width={'fit-content'}
          direction={orientation === 'horizontal' ? 'row' : 'column'}
          p="2"
        >
          {movesGrouped.entries().map(([moveNumber, moves]) => (
            <Grid
              height={'3'}
              columns={'1fr 3fr 3fr'}
              areas={'"move white black"'}
              gap="3"
              key={`${moveNumber}`}
            >
              <Flex gridArea={'move'} justify={'center'} align={'center'}>
                <Text size={'1'} color={'gray'}>
                  {moveNumber}.
                </Text>
              </Flex>
              {moves.map((move) => (
                <Badge
                  style={{
                    width: 'fit-content',
                  }}
                  key={`${move.moveNumber}-${move.turn}`}
                  variant={move.turn === Color.White ? 'solid' : 'outline'}
                  color={move.turn === Color.White ? 'gray' : 'gray'}
                >
                  {move.displayStr}
                </Badge>
              ))}
            </Grid>
          ))}
        </Flex>
      </ScrollArea>
    );
  }
};
