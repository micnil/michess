export type LlmResponse = {
  content: string;
  finishReason: 'stop' | 'length' | 'error';
};
