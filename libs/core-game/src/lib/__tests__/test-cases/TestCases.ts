import { FenStr } from '@michess/core-models';
type TestCase = {
  description?: string;
  start: {
    fen: FenStr;
    description?: string;
  };
  expected: Array<{
    move: string;
    fen: FenStr;
  }>;
};
export type TestCases = {
  description?: string;
  testCases: TestCase[];
};
