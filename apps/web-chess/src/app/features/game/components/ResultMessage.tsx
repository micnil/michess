import { GameResultV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { Flex, Text } from '@radix-ui/themes';

import { FC } from 'react';

type Props = {
  result: Maybe<GameResultV1>;
};

const toColor = (resultType: GameResultV1['type']): string => {
  switch (resultType) {
    case 'black_win':
      return 'Black';
    case 'white_win':
      return 'White';
    default:
      return 'Draw';
  }
};

export const ResultMessage: FC<Props> = ({ result }) => {
  return result ? (
    <Flex align="center" justify="center" p="3">
      {result.type !== 'draw' ? (
        <Text color="gold" size="4">
          {toColor(result.type)} wins!
        </Text>
      ) : (
        <Text>Game drawn</Text>
      )}
    </Flex>
  ) : null;
};
