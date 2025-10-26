import { RadioCards } from '@radix-ui/themes';
import { TextSeparator } from '../../../components/TextSeparator';

type TimeControlStr = `${number}|${number}`;
type Props = {
  onValueChange?: (value: TimeControlStr) => void;
  name: string;
};
export const TimeControlRadioCards = (props: Props) => {
  return (
    <RadioCards.Root
      name={props.name}
      onValueChange={(val) => {
        props.onValueChange?.(val as TimeControlStr);
      }}
    >
      <TextSeparator style={{ gridColumn: '1 / -1' }} text="Bullet" />
      <RadioCards.Item value="1|0">1|0</RadioCards.Item>
      <RadioCards.Item value="1|1">1|1</RadioCards.Item>
      <RadioCards.Item value="2|1">2|1</RadioCards.Item>
      <TextSeparator style={{ gridColumn: '1 / -1' }} text="Blitz" />
      <RadioCards.Item value="3|0">3|0</RadioCards.Item>
      <RadioCards.Item value="3|2">3|2</RadioCards.Item>
      <RadioCards.Item value="5|0">5|0</RadioCards.Item>
      <TextSeparator style={{ gridColumn: '1 / -1' }} text="Rapid" />
      <RadioCards.Item value="10|0">10|0</RadioCards.Item>
      <RadioCards.Item value="15|10">15|10</RadioCards.Item>
      <RadioCards.Item value="30|0">30|0</RadioCards.Item>
    </RadioCards.Root>
  );
};
