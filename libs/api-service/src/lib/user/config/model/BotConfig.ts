export type BotConfig = {
  id: string;
  name: string;
  username: string;
  description: string;
  provider: 'gemini' | 'claude' | 'gpt' | 'deepseek';
  model: string;
  personality: string;
  temperature: number;
};
