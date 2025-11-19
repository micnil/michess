export type BotConfig = {
  id: string;
  name: string;
  username: string;
  description: string;
  provider: 'gemini' | 'claude' | 'gpt';
  model: string;
  personality: string;
  temperature: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
};
