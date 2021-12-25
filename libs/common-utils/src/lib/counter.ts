type GetCount = () => number;
type Add = (value: number) => number;

type Counter = [GetCount, Add];

export const counter = (initialValue: number): Counter => {
  let value = initialValue;
  return [() => value, (inc: number) => (value = value + inc)];
};
