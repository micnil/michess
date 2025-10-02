import { Color, MoveNotation } from '@michess/core-board';
import { Badge, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { FC, Fragment, useEffect, useRef } from 'react';

type Props = {
  moves: MoveNotation[];
};

export const MovesRecord: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [props.moves]);

  if (props.moves.length === 0) {
    return (
      <Box p="2" style={{ textAlign: 'center', color: 'var(--gray-11)' }}>
        No moves yet
      </Box>
    );
  } else {
    return (
      <ScrollArea
        ref={ref}
        type="always"
        scrollbars="horizontal"
        size={'1'}
        style={{
          minWidth: '100%',
          width: '0',
          height: '2rem',
        }}
      >
        <Flex gap="2">
          {props.moves.map((move) => (
            <Fragment key={`${move.moveNumber}-${move.turn}`}>
              {move.turn === Color.White && (
                <Text size={'1'} color={'gray'} ml={'1'} align={'center'}>
                  {move.moveNumber}.
                </Text>
              )}
              <Badge
                variant={move.turn === Color.White ? 'outline' : 'solid'}
                color={move.turn === Color.White ? 'gray' : 'gray'}
              >
                {move.displayStr}
              </Badge>
            </Fragment>
          ))}
        </Flex>
      </ScrollArea>
    );
  }
};
